
    /*
        COLOQUE AQUI A URL DO SEU GOOGLE APPS SCRIPT
    */
    const URL_SCRIPT = "COLE_AQUI_A_URL_DO_APPS_SCRIPT";


    // =========================
    // MÁSCARA CNPJ
    // =========================

    document.getElementById("cnpj").addEventListener("input", function(e) {

        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.substring(0, 14);

        valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

        e.target.value = valor;

    });


    // =========================
    // MÁSCARA CELULAR
    // =========================

    document.getElementById("celular").addEventListener("input", function(e) {

        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        e.target.value = valor;

    });


    // =========================
    // MÁSCARA TELEFONE
    // =========================

    document.getElementById("telefone").addEventListener("input", function(e) {

        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.substring(0, 10);

        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

        e.target.value = valor;

    });


    // =========================
    // VALIDAR CELULAR
    // =========================

    function validarCelular() {

        const celular = document
            .getElementById("celular")
            .value
            .replace(/\D/g, "");

        const mensagem = document.getElementById("mensagem");

        if (celular.length !== 11) {

            mensagem.innerText = "Digite um celular válido com DDD.";
            mensagem.style.color = "red";

            return;
        }

        mensagem.innerText = "Celular válido!";
        mensagem.style.color = "green";
    }


    // =========================
    // ENVIO DO FORMULÁRIO
    // =========================

    document
        .getElementById("formCadastro")
        .addEventListener("submit", async function(e) {

            e.preventDefault();

            const mensagem = document.getElementById("mensagem");

            const nome = document.getElementById("nome").value.trim();
            const cnpj = document.getElementById("cnpj").value.trim();
            const email = document.getElementById("email").value.trim();
            const celular = document.getElementById("celular").value.trim();
            const telefone = document.getElementById("telefone").value.trim();


            // Verificação do celular

            const celularNumeros = celular.replace(/\D/g, "");

            if (celularNumeros.length !== 11) {

                mensagem.innerText = "Informe um celular válido com DDD.";
                mensagem.style.color = "red";

                return;
            }


            // Verificação do CNPJ

            const cnpjNumeros = cnpj.replace(/\D/g, "");

            if (cnpjNumeros.length !== 14) {

                mensagem.innerText = "Informe um CNPJ válido.";
                mensagem.style.color = "red";

                return;
            }


            // Dados que serão enviados

            const dados = {

                nome: nome,
                cnpj: cnpj,
                email: email,
                celular: celular,
                telefone: telefone

            };


            mensagem.innerText = "Cadastrando...";
            mensagem.style.color = "black";


            try {

                await fetch(URL_SCRIPT, {

                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(dados)

                });


                mensagem.innerText = "Cadastro realizado com sucesso!";
                mensagem.style.color = "green";


                document
                    .getElementById("formCadastro")
                    .reset();


            } catch (erro) {

                console.error(erro);

                mensagem.innerText =
                    "Erro ao realizar o cadastro.";

                mensagem.style.color = "red";

            }

        });
