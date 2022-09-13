
// #app ul - pega a ul de #app (div)
let listElement = document.querySelector("#app ul") as HTMLUListElement;
let inputElement = document.querySelector("#app input") as HTMLInputElement;
let buttonElement = document.querySelector("#app button") as HTMLElement;

let listaSalva: (string | null) = localStorage.getItem("@listagem_tarefas"); //pegar a lista salva  na store

let tarefas: string[] = listaSalva !== null && JSON.parse(listaSalva) || []; 
//se a listaSalva nao for vazia ela será convertida de string para array, senao é convertida para um array vazio

function listarTarefas(){
    listElement.innerHTML = "" //limpar a lista do HTML

    tarefas.map(item => {//item é um array de string
        let todoElement = document.createElement("li"); //criar os itens de lista dinamicamente
        let tarefaText = document.createTextNode(item); //criar um texto no html

        let linkElement = document.createElement("a"); //elemento do tipo ancora
        linkElement.setAttribute("href", "#");//nome href com valor #

        let posicao = tarefas.indexOf(item);//procura item no array

        linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`);//atributo onclick vai chamar a funcao

        let linkText = document.createElement("img");
        linkText.setAttribute("src", "3669361_delete_ic_icon.png")
        linkElement.appendChild(linkText);
        
        //criando checkbox
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.id = "id";
        // console.log(checkbox.checked);
        checkbox.addEventListener("change", () => {
            console.log(item, checkbox.checked);
            checkbox.checked ? todoElement.classList.add("palavra-cortada") : todoElement.classList.remove("palavra-cortada")
        })
        checkbox.setAttribute("style", "margin-right: 10px");
       
        todoElement.appendChild(checkbox);
        
        todoElement.appendChild(tarefaText);//mostrar em tela / colocar em uma li o texto passado

        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);//colocar a li dentro da ul
    })
}

listarTarefas();

function adicionarTarefa(){
    if(inputElement.value === ""){//verificar se foi digitado algo
        alert("Digite alguma tarefa!")
        return false;
    }else{

        let tarefaDigitada:string = inputElement.value;
        tarefas.push(tarefaDigitada);//armazena o dado

        inputElement.value = ""; //zera a variavel
        
        listarTarefas();
        salvarDados();
    }
}

buttonElement.onclick = adicionarTarefa

function deletarTarefa(posicao:number){
    tarefas.splice(posicao, 1); //deleta o primeiro item da posicao (nesse caso so tem um item)

    listarTarefas();
    salvarDados();
}

//armazenar dados no localStore para nao perde-los ao recarregar a pagina
function salvarDados(){
    //parametros do setItem(key, string)
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas))//converte array para string
}
