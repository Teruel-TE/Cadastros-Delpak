// ========================================
// URL DO GOOGLE APPS SCRIPT
// ========================================

const URL_SCRIPT =
    "https://script.google.com/macros/s/AKfycbyRXyDhdvv9oFOfvCydS8N5tUxGan3ULwRK3K52zs2LeVIkWAYD9HJbqOdrVFRRod9GUQ/exec";


// ========================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ========================================

const secaoPrincipal =
    document.getElementById("secao-principal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("mostrar");

            } else {

                entry.target.classList.remove("mostrar");

            }

        });

    },
    {
        threshold: 0.2
    }
);

observer.observe(secaoPrincipal);


// ========================================
// MÁSCARA CNPJ
// ========================================

document
    .getElementById("cnpj")
    .addEventListener("input", function (e) {

        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.substring(0, 14);

        valor = valor.replace(
            /^(\d{2})(\d)/,
            "$1.$2"
        );

        valor = valor.replace(
            /^(\d{2})\.(\d{3})(\d)/,
            "$1.$2.$3"
        );

        valor = valor.replace(
            /\.(\d{3})(\d)/,
            ".$1/$2"
        );

        valor = valor.replace(
            /(\d{4})(\d)/,
            "$1-$2"
        );

        e.target.value = valor;

    });


// ========================================
// MÁSCARA CELULAR
// ========================================

document
    .getElementById("celular")
    .addEventListener("input", function (e) {

        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

        valor = valor.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
        );

        valor = valor.replace(
            /(\d{5})(\d)/,
            "$1-$2"
        );

        e.target.value = valor;

    });


// ========================================
// MÁSCARA TELEFONE FIXO
// ========================================

document
    .getElementById("telefone")
    .addEventListener("input", function (e) {

        let valor = e.target.value.replace(/\D/g, "");

        valor = valor.substring(0, 10);

        valor = valor.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
        );

        valor = valor.replace(
            /(\d{4})(\d)/,
            "$1-$2"
        );

        e.target.value = valor;

    });


// ========================================
// VALIDAR CELULAR
// ========================================

document
    .getElementById("botaoValidar")
    .addEventListener("click", function () {

        const celular =
            document
                .getElementById("celular")
                .value
                .replace(/\D/g, "");

        const mensagem =
            document.getElementById("mensagem");


        if (celular.length !== 11) {

            mensagem.innerText =
                "Digite um celular válido com DDD.";

            mensagem.style.color = "#ff4d6d";

            return;

        }


        mensagem.innerText =
            "Celular válido!";

        mensagem.style.color =
            "#10b981";

    });


// ========================================
// CADASTRAR
// ========================================

document
    .getElementById("formCadastro")
    .addEventListener("submit", async function (e) {

        e.preventDefault();


        const mensagem =
            document.getElementById("mensagem");


        // PEGAR DADOS

        const nome =
            document
                .getElementById("nome")
                .value
                .trim();


        const cnpj =
            document
                .getElementById("cnpj")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const celular =
            document
                .getElementById("celular")
                .value
                .trim();


        const telefone =
            document
                .getElementById("telefone")
                .value
                .trim();


        // ========================================
        // VALIDAR CNPJ
        // ========================================

        const cnpjNumeros =
            cnpj.replace(/\D/g, "");


        if (cnpjNumeros.length !== 14) {

            mensagem.innerText =
                "Informe um CNPJ válido.";

            mensagem.style.color =
                "#ff4d6d";

            return;

        }


        // ========================================
        // VALIDAR CELULAR
        // ========================================

        const celularNumeros =
            celular.replace(/\D/g, "");


        if (celularNumeros.length !== 11) {

            mensagem.innerText =
                "Informe um celular válido com DDD.";

            mensagem.style.color =
                "#ff4d6d";

            return;

        }


        // ========================================
        // CRIAR OBJETO
        // ========================================

        const dados = {

            nome: nome,

            cnpj: cnpj,

            email: email,

            celular: celular,

            telefone: telefone

        };


        mensagem.innerText =
            "Cadastrando...";

        mensagem.style.color =
            "#ffffff";


        // ========================================
        // ENVIAR PARA GOOGLE PLANILHAS
        // ========================================

        try {

            await fetch(URL_SCRIPT, {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(dados)

            });


            mensagem.innerText =
                "Cadastro realizado com sucesso!";

            mensagem.style.color =
                "#10b981";


            // LIMPAR FORMULÁRIO

            document
                .getElementById("formCadastro")
                .reset();


        } catch (erro) {

            console.error(erro);


            mensagem.innerText =
                "Erro ao realizar o cadastro.";

            mensagem.style.color =
                "#ff4d6d";

        }

    });