class Main {
    constructor() {
        this.diagramsIncome = document.getElementById('diagrams-income');
        this.diagramsExpenses = document.getElementById('diagrams-expenses');

        this.initDiagrams();
    }

    initDiagrams() {
        this.initDiagramIncome();
        this.initDiagramExpenses();
    }

    initDiagramIncome(){
        const configDiagramIncome = {
            type: 'pie',
            data: {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: [1, 2, 3, 5, 5],
                        borderColor: ['red', 'orange', 'yellow', 'green', 'blue'],
                        backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
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
        new Chart(this.diagramsIncome, configDiagramIncome);
    }

    initDiagramExpenses(){
        const configDiagramExpenses = {
            type: 'pie',
            data: {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: [1, 2, 3, 5, 5],
                        borderColor: ['red', 'orange', 'yellow', 'green', 'blue'],
                        backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
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
        new Chart(this.diagramsExpenses, configDiagramExpenses);
    }
}

window.onload = () => {
    new Main();
}


