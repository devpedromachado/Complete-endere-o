document.addEventListener("DOMContentLoaded", () => {
    const btnPesquisarCEP = document.querySelector("#btnPesquisar");

    btnPesquisarCEP.addEventListener("click", (event) => {
        event.preventDefault(); // Previne o comportamento padrão

        console.log("Evento disparado");

        const inputDoCep = document.querySelector("#cep");
        const valorDoCep = inputDoCep.value.trim(); // Remove espaços extras

        if (!valorDoCep) {
            console.error("O CEP não pode estar vazio.");
            return;
        }

        const url = `https://viacep.com.br/ws/${valorDoCep}/json/`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na resposta da API: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Dados recebidos da API:", data);
                atribuirCampos(data);
            })
            .catch(error => {
                console.error("Erro ao buscar o CEP:", error);
            });
    });

    function atribuirCampos(data) {
        console.log("Atribuindo campos com os dados:", data);

        const rua = document.querySelector("#rua");
        const complemento = document.querySelector("#complemento");
        const bairro = document.querySelector("#bairro");
        const cidade = document.querySelector("#cidade");
        const estado = document.querySelector("#estado");

        rua.value = data.logradouro || '';
        complemento.value = data.complemento || '';
        bairro.value = data.bairro || '';
        cidade.value = data.localidade || '';
        estado.value = data.uf || '';
    }
});


const btnLimpar = document.getElementById('btnLimpar'); 
btnLimpar.addEventListener("click", (event) => {
    rua.value = ''; 
    complemento.value = ''; 
    bairro.value = ''; 
    cidade.value = ''; 
    estado.value = ''; 
})