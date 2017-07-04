Vue.filter('doneLabel', function (value) {
    if(value == 0){
        return "Não Paga";
    }
    return "Paga";
});


var app = new Vue({
    el: "#app",
    data: {
        test: '',
        menus: [
            { id: 0, name: "Listar contas"}, { id: 1, name: "Criar contas"}
        ],
        activedView: 0,
        formType: 'insert',
        title: "Contas a pagar",
        bill: {
          date_due: '',
          name: '',
          value: 0,
          done: 0
        },
        names: [
            'Conta de Luz',
            'Conta de água',
            'Conta de Telefone',
            'Supermercado',
            'Cartão de Crédito',
            'Empréstimo',
            'Gasolina'
        ],
        bills: [
            {date_due: '20/08/2016', name: 'Conta de Luz', value: 70.99, done: 1},
            {date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: 0},
            {date_due: '22/08/2016', name: 'Conta de Telefone', value: 55.99, done: 0},
            {date_due: '23/08/2016', name: 'Supermercado', value: 624.99, done: 0},
            {date_due: '24/08/2016', name: 'Cartão de Crédito', value: 1500.99, done: 0},
            {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: 0},
            {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: 0}
        ]
    },
    computed: {
        status: function(){
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            return !count ? "Nenhuma conta a pagar" : "Existem " + count + " a serem pagas";
        }
    },
    methods: {
        showView: function(id) {
            this.activedView = id;
            if(id == 1){
                this.formType = 'insert';
            }
        },
        submit: function(){
            if(this.formType == 'insert'){
                this.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };

            this.activedView = 0;
        },
        loadBill: function(bill){
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function (bill) {
            if(confirm('Deseja excluir esta conta?')) {
                this.bills.$remove(bill);
            }
        }
    }
});

