import Chart from 'chart.js/auto';
import { OperationsServices } from '../services/operations-services';

export class Main {
    constructor() {
        this.noOperationsTitle = document.getElementById('no-operations-title');
        this.diagramsIncomeBlockElement = document.getElementById('block-income');
        this.diagramsExpensesBlockElement = document.getElementById('block-expenses');
        this.diagramsIncomeElement = document.getElementById('diagrams-income');
        this.diagramsExpensesElement = document.getElementById('diagrams-expenses');
        this.intervalInputsElement = document.getElementById('interval-inputs');
        this.dateFromElement = document.getElementById('date-from');
        this.dateToElement = document.getElementById('date-to');

        this.diagramsIncome = null;
        this.diagramsExpenses = null;

        this.initEvents();

        this.buildDiagrams('today');
    }

    initEvents(){
        this.dateFromElement.addEventListener('change', this.changingDateInterval.bind(this));
        this.dateToElement.addEventListener('change', this.changingDateInterval.bind(this));
        document.querySelectorAll('input[name="interval"]').forEach(element => {
            element.addEventListener('change', this.changingInterval.bind(this));
        });
    }

    async buildDiagrams(interval) {
        this.diagramsIncomeBlockElement.classList.add('d-none');
        this.diagramsExpensesBlockElement.classList.add('d-none');

        const operations = await this.getOperations(interval);
        if (operations && operations.length > 0) {
            const filterOperationsForIncomeAndExpenses = this.filterOperationsForIncomeAndExpenses(operations);
            
            if(filterOperationsForIncomeAndExpenses.income.length > 0){
                this.diagramsIncomeBlockElement.classList.remove('d-none');
                this.initDiagramIncome(this.formatDataForChart(filterOperationsForIncomeAndExpenses.income));
            }

            if(filterOperationsForIncomeAndExpenses.expense.length > 0){
                this.diagramsExpensesBlockElement.classList.remove('d-none');
                this.initDiagramExpenses(this.formatDataForChart(filterOperationsForIncomeAndExpenses.expense));
            }

            this.noOperationsTitle.classList.add('d-none');
        }else{
            this.noOperationsTitle.classList.remove('d-none');
        }
    }

    async getOperations(period) {
        let params = '?period=' + period;
        if (period === 'interval') {
            params += '&dateFrom=' + this.dateFromElement.value + '&dateTo=' + this.dateToElement.value;
        }

        const response = await OperationsServices.getOperations(params);
        if (response.error || response.redirect) {
            alert('Ошибка при получении списка доходов и рсходов.')
            return response.redirect ? this.openRoute(response.redirect) : null;
        }

        return response.content;
    }

    filterOperationsForIncomeAndExpenses(operations) {
        const income = operations.filter(item => item.type === 'income');
        const expense = operations.filter(item => item.type === 'expense');

        return {
            income: income,
            expense: expense
        }
    }

    formatDataForChart(operations) {
        let labels = [];
        let data = [];

        operations.forEach(item => {
            let indexCategory = labels.indexOf(item.category);
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

    initDiagramIncome(operations) {
        const configDiagramIncome = {
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

        if(this.diagramsIncome){
            this.diagramsIncome.destroy();
        }

        this.diagramsIncome = new Chart(this.diagramsIncomeElement, configDiagramIncome);
    }

    initDiagramExpenses(operations) {
        const configDiagramExpenses = {
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

        if(this.diagramsExpenses){
            this.diagramsExpenses.destroy();
        }

        this.diagramsExpenses = new Chart(this.diagramsExpensesElement, configDiagramExpenses);
    }

    changingDateInterval() {
        this.dateFromElement.max = this.dateToElement.value;
        this.dateToElement.min = this.dateFromElement.value;

        if (this.dateFromElement.value && this.dateToElement.value) {
            this.buildDiagrams('interval');
        }
    }

    changingInterval(e) {
        const interval = e.target.value;
        if (interval === 'interval') {
            this.dateFromElement.value = null;
            this.dateToElement.value = null;
            this.intervalInputsElement.classList.remove('d-none');
        } else {
            this.intervalInputsElement.classList.add('d-none');
            this.buildDiagrams(interval);
        }
    }
}


