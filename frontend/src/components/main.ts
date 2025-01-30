import Chart, { ChartConfiguration, ChartItem } from 'chart.js/auto';
import { OperationsServices } from '../services/operations-services';
import { DiagramIntervalType } from '../types/diagram-interval.type';
import { PatternResponseType } from '../types/pattern-response.type';
import { UserOperationType } from '../types/user-operation.type';
import { FilterOperationsType } from '../types/filter-operations.type';
import { OperationType } from '../types/operation.type';
import { DiagramInfoType } from '../types/diagram-info.type';
import { OpenRouteType } from '../types/open-route.type';

export class Main {
    readonly openRoute: OpenRouteType;

    readonly noOperationsTitle: HTMLElement | null;
    readonly diagramsIncomeBlockElement: HTMLElement | null;
    readonly diagramsExpensesBlockElement: HTMLElement | null;
    readonly diagramsIncomeElement: ChartItem | null;
    readonly diagramsExpensesElement: ChartItem | null;
    readonly intervalInputsElement: HTMLInputElement | null;
    readonly dateFromElement: HTMLInputElement | null;
    readonly dateToElement: HTMLInputElement | null;

    private diagramsIncome: Chart | null;
    private diagramsExpenses: Chart | null;

    constructor(openRoute: OpenRouteType) {
        this.openRoute = openRoute;

        this.noOperationsTitle = document.getElementById('no-operations-title');
        this.diagramsIncomeBlockElement = document.getElementById('block-income');
        this.diagramsExpensesBlockElement = document.getElementById('block-expenses');
        this.diagramsIncomeElement = document.getElementById('diagrams-income') as ChartItem;
        this.diagramsExpensesElement = document.getElementById('diagrams-expenses') as ChartItem;
        this.intervalInputsElement = document.getElementById('interval-inputs') as HTMLInputElement;
        this.dateFromElement = document.getElementById('date-from') as HTMLInputElement;
        this.dateToElement = document.getElementById('date-to') as HTMLInputElement;

        this.diagramsIncome = null;
        this.diagramsExpenses = null;

        this.initEvents();

        this.buildDiagrams(DiagramIntervalType.today);
    }

    private initEvents(): void {
        if (this.dateFromElement) {
            this.dateFromElement.addEventListener('change', this.changingDateInterval.bind(this));
        }
        if (this.dateToElement) {
            this.dateToElement.addEventListener('change', this.changingDateInterval.bind(this));
        }
        document.querySelectorAll('input[name="' + DiagramIntervalType.interval + '"]').forEach(element => {
            element.addEventListener('change', this.changingInterval.bind(this));
        });
    }

    private async buildDiagrams(interval: DiagramIntervalType) {
        if (!this.diagramsIncomeBlockElement || !this.diagramsExpensesBlockElement || !this.noOperationsTitle) return;

        this.diagramsIncomeBlockElement.classList.add('d-none');
        this.diagramsExpensesBlockElement.classList.add('d-none');

        const operations: UserOperationType[] | undefined = await this.getOperations(interval);
        if (operations && operations.length > 0) {
            const filterOperationsForIncomeAndExpenses = this.filterOperationsForIncomeAndExpenses(operations);

            if (filterOperationsForIncomeAndExpenses.income.length > 0) {
                this.diagramsIncomeBlockElement.classList.remove('d-none');
                this.initDiagramIncome(this.formatDataForChart(filterOperationsForIncomeAndExpenses.income));
            }

            if (filterOperationsForIncomeAndExpenses.expense.length > 0) {
                this.diagramsExpensesBlockElement.classList.remove('d-none');
                this.initDiagramExpenses(this.formatDataForChart(filterOperationsForIncomeAndExpenses.expense));
            }

            this.noOperationsTitle.classList.add('d-none');
        } else {
            this.noOperationsTitle.classList.remove('d-none');
        }
    }

    private async getOperations(interval: DiagramIntervalType): Promise<UserOperationType[] | undefined> {
        let params: string = '?period=' + interval;
        if (interval === DiagramIntervalType.interval && this.dateFromElement && this.dateToElement) {
            params += '&dateFrom=' + this.dateFromElement.value + '&dateTo=' + this.dateToElement.value;
        }

        const response: PatternResponseType = await OperationsServices.getOperations(params);
        if (response.error || response.redirect || !response.content) {
            alert('Ошибка при получении списка доходов и расходов.');
            if(response.redirect){
                this.openRoute(response.redirect);
            }
            return;
        }

        return response.content;
    }

    private filterOperationsForIncomeAndExpenses(operations: UserOperationType[]): FilterOperationsType {
        const income: UserOperationType[] = operations.filter(item => item.type === OperationType.income);
        const expense: UserOperationType[] = operations.filter(item => item.type === OperationType.expense);

        return {
            income: income,
            expense: expense
        }
    }

    private formatDataForChart(operations: UserOperationType[]): DiagramInfoType {
        let labels: string[] = [];
        let data: number[] = [];

        operations.forEach(item => {
            let indexCategory: number = labels.indexOf(item.category);
            if (indexCategory === -1) {
                labels.push(item.category ? item.category : 'Не установлена');
                data.push(Number(item.amount));
            } else {
                data[indexCategory] += item.amount;
            }
        });

        return {
            labels: labels,
            data: data
        };
    }

    private initDiagramIncome(operations: DiagramInfoType) {
        const configDiagramIncome: ChartConfiguration = {
            type: 'pie',
            data: {
                labels: operations.labels,
                datasets: [
                    {
                        label: 'Сумма в $',
                        data: operations.data
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            },
        };

        if (this.diagramsIncome) {
            this.diagramsIncome.destroy();
        }

        if (this.diagramsIncomeElement) {
            this.diagramsIncome = new Chart(this.diagramsIncomeElement, configDiagramIncome);
        }
    }

    private initDiagramExpenses(operations: DiagramInfoType) {
        const configDiagramExpenses: ChartConfiguration = {
            type: 'pie',
            data: {
                labels: operations.labels,
                datasets: [
                    {
                        label: 'Сумма в $',
                        data: operations.data
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            },
        };

        if (this.diagramsExpenses) {
            this.diagramsExpenses.destroy();
        }

        if (this.diagramsExpensesElement) {
            this.diagramsExpenses = new Chart(this.diagramsExpensesElement, configDiagramExpenses);
        }
    }

    private changingDateInterval(): void {
        if (this.dateFromElement && this.dateToElement) {
            this.dateFromElement.max = this.dateToElement.value;
            this.dateToElement.min = this.dateFromElement.value;

            if (this.dateFromElement.value && this.dateToElement.value) {
                this.buildDiagrams(DiagramIntervalType.interval);
            }
        }
    }

    private changingInterval(e: Event): void {
        if (!this.dateFromElement || !this.dateToElement || !this.intervalInputsElement) return;

        const interval: DiagramIntervalType = (e.target as HTMLInputElement).value as DiagramIntervalType;

        if (interval === DiagramIntervalType.interval) {
            this.dateFromElement.value = '';
            this.dateToElement.value = '';
            this.intervalInputsElement.classList.remove('d-none');
        } else {
            this.intervalInputsElement.classList.add('d-none');
            this.buildDiagrams(interval);
        }
    }
}


