Vue.filter('doneLabel', function (value) {
    if(value == 0){
        return "Não Paga";
    }
    return "Paga";
});
Vue.filter('generalStatus', function (value) {
    if(value == -1){
        return "Nenhuma conta cadastrada";
    }
    else if(value > 0){
        return "Existem " + value + " contas a serem pagas";
    }
    else {
        return "Nenhuma conta a pagar";
    }
});

var app = new Vue({
    el: "#app",
    data: {
        test: '',
        menus: [
            { id: 0, name: "Listar contas"}, { id: 1, name: "Criar contas"}
        ],
        activedView: 0,
        debts: false,
        paids: false,
        empty: true,
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
        ]
    },
    computed: {
        countDebts: function(){
            this.debts = false;
            this.empty = false;
            if(!this.bills.length){
                this.empty = true;
                return -1;
            }
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            this.debts = count;
            return count;
        },

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
        deleteBill: function (index) {
            if(confirm('Deseja excluir esta conta?')) {
                this.bills.splice(index, 1);
            }
        }
    }
});


