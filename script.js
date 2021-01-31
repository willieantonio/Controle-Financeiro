const Modal = {
    open() {
        //Abrir modal
        //Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close() {
        //Fechar o modal
        //Remover a classe active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

//Eu preciso somas  as entradas
//Somas as saídas
//subtrair o ttotal de entradas das saídas
//Para resultar no total


const Transaction = {
    all: transactions = [

        {

            description: 'Luz',
            amount: -50000,
            date: '23/01/2021',
        },
        {

            description: 'Website',
            amount: 500000,
            date: '23/01/2021',
        },
        {

            description: 'Internet',
            amount: -20000,
            date: '23/01/2021',
        },
        {

            description: 'App',
            amount: 120000,
            date: '23/01/2021',
        },
    ],
    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },
    incomes() {
        let income = 0;
        //Somar as entradas
        //para cada transação
        Transaction.all.forEach(transaction => {
            //se ela for maior que zero
            if (transaction.amount > 0) {
                //Somar a uma variavel e retornar a variavel
                income += transaction.amount;
            }
        })

        return income;
    },
    expenses() {
        let expense = 0;
        //Somar as saídas
        //para cada transação
        Transaction.all.forEach(transaction => {
            //se ela for menor que zero
            if (transaction.amount < 0) {
                //Somar a uma variavel e retornar a variavel
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
        //Soma das entradas - a s saídas

        return Transaction.incomes() + Transaction.expenses()

    }

}

//Preciso pegar as minhas transações do  meu 
//objeto aqui no JS
// e colocar no HTML

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionContainer.appendChild(tr)

        // console.log(tr.innerHTML)
        // para verificar o que esta sendo mostrado no tr.innerHTML
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense" //definir se o a cordo valor  vai ser verde para entradas ou vermelho para saidas 

        const amount = Utils.formatCurrency(transaction.amount)


        const html = `
			<td class="description">${transaction.description}</td>
			<td class=${CSSclass}>${amount}</td>
			<td class="date">${transaction.date}</td>
			<td>
				<img src="./assets/minus.svg" alt="Remover transação">
            </td>
            `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionContainer.innerHTML = ""
    },
}

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100

        return value
    },

    formatDate(date){
        const splittedDate = date.split("-")

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
    
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency", //currency moeda
            currency: "BRL"
        })

        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getvalues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    formatData() {

    },
    validateFields() {
        const { description, amount, date } = Form.getvalues()

        if (description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
            throw new Error("Preencha todos os Campos")
        }
    },

    formatValues(){
        let{description, amount, date} = Form.getvalues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

       return{
           description,
           amount,
           date
       }

    },

    saveTransaction(transaction){
        Transaction.add(transaction)
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },
    submit(event) {
        event.preventDefault()

        try {
            //validar os dados
            //Verificar se todas as informações foram preenchidas
            Form.validateFields()
            //Formatar dados para Salvar
            const transaction = Form.formatValues()                      
            //Salvar da Fato
            Form.saveTransaction(transaction)
            //Apagar os dados do formulario
            Form.clearFields()
            //o modal deve fechar
            Modal.close()
            //atualizar a aplicação
            //App.reload() esta no add
    
        } catch (error) {
            alert(error.message)
        }       

    }
}

const App = {
    init() {
        Transaction.all.forEach(function (transaction) {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()

    },

    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()

