// Visualizador da etapa 1. Depende de dados/amostra_instancias.js (COLUNAS, INSTANCIAS)
// e de js/explicacoes.js (EXPLICACOES, PANORAMA_TREINO).

const colunasCategoricas = ["protocol_type", "service", "flag"];
const colunasBinarias = ["land", "logged_in", "root_shell", "is_host_login", "is_guest_login"];
const colunasTaxas = COLUNAS.filter(nome => nome.endsWith("_rate"));
const colunasContagens = COLUNAS.filter(nome =>
    nome !== "class" && ![...colunasCategoricas, ...colunasBinarias, ...colunasTaxas].includes(nome));

const COLUNAS_POR_GRUPO = {
    todas: COLUNAS.filter(nome => nome !== "class"),
    categoricos: colunasCategoricas,
    binarios: colunasBinarias,
    contagens: colunasContagens,
    taxas: colunasTaxas,
};

const grupoDaColuna = nome =>
    colunasCategoricas.includes(nome) ? "categoricos" : colunasBinarias.includes(nome) ? "binarios"
    : colunasTaxas.includes(nome) ? "taxas" : "contagens";

const PRIORIDADE_DAS_ETIQUETAS = ["inconsistencia", "ausentes", "redundancia", "extremo", "desbalanceamento", "categoricos"];
const ROTULO_DA_ETIQUETA = {
    categoricos: "Atributo categórico", 
    inconsistencia: "Inconsistência", 
    ausentes: "Valores ausentes",
    redundancia: "Redundância",
    desbalanceamento: "Desbalanceamento", 
    extremo: "Valor extremo",
};

const SELETORES_DE_COLUNAS = [
    { chave: "todas", rotulo: "Todos os atributos" },
    { chave: "categoricos", rotulo: "Categóricos" },
    { chave: "binarios", rotulo: "Binários" },
    { chave: "contagens", rotulo: "Contagens e tamanhos" },
    { chave: "taxas", rotulo: "Taxas" },
];

const SELETORES_DE_INSTANCIAS = [
    { chave: "todas", rotulo: "Todas as instâncias" },
    { chave: "inconsistencia", rotulo: "Inconsistências" },
    { chave: "ausentes", rotulo: "Valores ausentes" },
    { chave: "redundancia", rotulo: "Redundâncias" },
    { chave: "desbalanceamento", rotulo: "Desbalanceamento" },
    { chave: "extremo", rotulo: "Valores extremos" },
];

const estado = { grupoDeColunas: "todas", filtroDeInstancias: "todas", linhaSelecionada: null };

// Formatação com exibição explícita para valores nulos/ausentes
const formatarValor = valor => {
    if (valor === null || valor === undefined || valor === "" || valor === " ") {
        return "null";
    }
    return typeof valor === "number" 
        ? valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) 
        : valor;
};

const etiquetaPrincipal = instancia => PRIORIDADE_DAS_ETIQUETAS.find(tag => instancia.tags.includes(tag));
const instanciasVisiveis = () => INSTANCIAS.filter(instancia =>
    estado.filtroDeInstancias === "todas" || instancia.tags.includes(estado.filtroDeInstancias));

function criarSeletor(idDoContainer, opcoes, chaveDoEstado, prefixoDaExplicacao, detalhe) {
    const container = document.getElementById(idDoContainer);
    if (!container) return;
    container.replaceChildren();
    opcoes.forEach((opcao, posicao) => {
        const rotulo = document.createElement("label");
        rotulo.className = `viz-opcao cor-${opcao.chave}`;
        const entrada = document.createElement("input");
        entrada.type = "radio";
        entrada.name = idDoContainer;
        entrada.checked = posicao === 0;
        const corpo = document.createElement("span");
        corpo.className = "viz-opcao-corpo";
        const nome = document.createElement("span");
        nome.className = "viz-opcao-nome";
        nome.textContent = opcao.rotulo;
        const quantidade = document.createElement("span");
        quantidade.className = "viz-opcao-detalhe";
        quantidade.textContent = detalhe(opcao.chave);
        corpo.append(nome, quantidade);
        rotulo.append(entrada, corpo);
        entrada.addEventListener("change", () => {
            estado[chaveDoEstado] = opcao.chave;
            mostrarExplicacao(`${prefixoDaExplicacao}_${opcao.chave}`, opcao.chave);
            desenharTabela();
        });
        container.appendChild(rotulo);
    });
}

function mostrarExplicacao(chave, chaveDaCor) {
    const explicacao = EXPLICACOES[chave];
    if (!explicacao) return;
    const painel = document.getElementById("viz-explicacao");
    if (!painel) return;
    painel.className = `viz-explicacao cor-${chaveDaCor}`;
    document.getElementById("viz-explicacao-titulo").textContent = explicacao.titulo;
    const texto = document.getElementById("viz-explicacao-texto");
    texto.replaceChildren(...explicacao.paragrafos.map(conteudo => {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = conteudo;
        return paragrafo;
    }));
    const panorama = document.getElementById("viz-panorama");
    if (panorama) {
        panorama.hidden = chave !== "instancias_desbalanceamento";
        if (!panorama.hidden) desenharPanorama(panorama);
    }
}

function desenharPanorama(painel) {
    painel.replaceChildren();
    if (typeof PANORAMA_TREINO === "undefined") return;
    [["class", "Classe"], ["protocol_type", "protocol_type"]].forEach(([chave, titulo]) => {
        const bloco = document.createElement("div");
        bloco.className = "viz-distribuicao";
        const cabecalho = document.createElement("h3");
        cabecalho.textContent = `${titulo} na base de treino (${PANORAMA_TREINO.total.toLocaleString("pt-BR")} linhas)`;
        bloco.appendChild(cabecalho);
        PANORAMA_TREINO[chave].forEach(([categoria, quantidade]) => {
            const percentual = quantidade / PANORAMA_TREINO.total * 100;
            const linha = document.createElement("div");
            linha.className = "viz-linha-barra";
            const nome = document.createElement("span");
            nome.textContent = categoria;
            const trilha = document.createElement("div");
            trilha.className = "viz-trilha";
            const preenchimento = document.createElement("span");
            preenchimento.style.width = `${Math.max(percentual, 0.5)}%`;
            trilha.appendChild(preenchimento);
            const valor = document.createElement("b");
            valor.textContent = `${percentual.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;
            linha.append(nome, trilha, valor);
            bloco.appendChild(linha);
        });
        painel.appendChild(bloco);
    });
}

function criarCabecalho(nome, classeDeCor) {
    const celula = document.createElement("th");
    celula.scope = "col";
    celula.textContent = nome;
    celula.className = classeDeCor;
    if (colunasCategoricas.includes(nome) || nome === "class") celula.classList.add("viz-texto");
    return celula;
}

function desenharTabela() {
    const nomesDasColunas = COLUNAS_POR_GRUPO[estado.grupoDeColunas];
    const linhas = instanciasVisiveis();
    const tabela = document.getElementById("viz-tabela");
    if (!tabela) return;
    tabela.replaceChildren();

    // 1. Cabeçalho da tabela
    const cabecalho = tabela.createTHead().insertRow();
    cabecalho.appendChild(criarCabecalho("linha", "cor-todas"));
    nomesDasColunas.forEach(nome => cabecalho.appendChild(
        criarCabecalho(nome, `cor-${estado.grupoDeColunas === "todas" ? grupoDaColuna(nome) : estado.grupoDeColunas}`)
    ));
    cabecalho.appendChild(criarCabecalho("class", "cor-todas"));

    // 2. Corpo da tabela
    const corpo = tabela.createTBody();
    linhas.forEach(instancia => {
        const tagAtiva = estado.filtroDeInstancias !== "todas" 
            ? estado.filtroDeInstancias 
            : etiquetaPrincipal(instancia);
            
        const classeDeCor = `cor-${tagAtiva}`;

        const tr = corpo.insertRow();
        tr.tabIndex = 0;
        tr.dataset.linha = instancia.linha;
        tr.setAttribute("aria-selected", String(instancia.linha === estado.linhaSelecionada));
        
        const selecionar = () => selecionarLinha(instancia.linha);
        tr.addEventListener("click", selecionar);
        tr.addEventListener("keydown", evento => {
            if (evento.key === "Enter" || evento.key === " ") { 
                evento.preventDefault(); 
                selecionar(); 
            }
        });

        // Célula indicadora do índice da linha
        const celulaLinha = tr.insertCell();
        celulaLinha.textContent = instancia.linha;
        celulaLinha.className = `viz-marca ${classeDeCor}`;

        // Células de atributos
        [...nomesDasColunas, "class"].forEach(nome => {
            const celula = tr.insertCell();
            const valor = instancia.valores[COLUNAS.indexOf(nome)];
            const ehNulo = (valor === null || valor === undefined || valor === "" || valor === " ");
            
            celula.textContent = formatarValor(valor);
            
            // 1. Estilo base por tipo de dado
            if (ehNulo) {
                celula.classList.add("viz-nulo");
            } else if (typeof valor === "string") {
                celula.classList.add("viz-texto");
            }

            // 2. Estilo para a coluna de classe alvo
            if (nome === "class") {
                celula.classList.add(valor === "anomaly" ? "viz-anomalia" : "viz-normal");
            }
            
            // 3. Coloração de células em destaque:
            // - Se o filtro ativo for "ausentes", colore APENAS as células que forem realmente nulas
            // - Nos demais filtros, colore com a cor da categoria quando a coluna estiver nos destaques da instância
            if (estado.filtroDeInstancias === "ausentes") {
                if (ehNulo) {
                    celula.classList.add("viz-destaque", "cor-ausentes");
                }
            } else if (instancia.destaques.includes(nome)) {
                celula.classList.add("viz-destaque", classeDeCor);
            }
        });
    });

    // 3. Atualização do contador de instâncias
    const contagem = document.getElementById("viz-contagem");
    if (contagem) {
        contagem.textContent = `Mostrando ${linhas.length} de ${INSTANCIAS.length} instâncias e ${nomesDasColunas.length} de ${COLUNAS.length - 1} atributos, mais a classe.`;
    }

    // 4. Manutenção de seleção de linha
    if (!linhas.some(i => i.linha === estado.linhaSelecionada)) {
        selecionarLinha(linhas.length ? linhas[0].linha : null);
    }
}

function selecionarLinha(numeroDaLinha) {
    estado.linhaSelecionada = numeroDaLinha;
    
    const trSelecionada = document.querySelector(`#viz-tabela tbody tr[data-linha="${numeroDaLinha}"]`);
    document.querySelectorAll("#viz-tabela tbody tr").forEach(tr =>
        tr.setAttribute("aria-selected", String(Number(tr.dataset.linha) === numeroDaLinha)));

    if (trSelecionada) {
        trSelecionada.scrollIntoView({ block: "nearest", inline: "nearest" });
    }

    const caixa = document.getElementById("viz-motivo");
    if (!caixa) return;
    caixa.replaceChildren();
    const instancia = INSTANCIAS.find(i => i.linha === numeroDaLinha);
    if (!instancia) return;

    const titulo = document.createElement("h3");
    titulo.textContent = `Por que a linha ${instancia.linha} está na amostra`;
    const etiquetas = document.createElement("ul");
    etiquetas.className = "viz-etiquetas";
    instancia.tags.forEach(tag => {
        const item = document.createElement("li");
        item.className = `cor-${tag}`;
        item.textContent = ROTULO_DA_ETIQUETA[tag] || tag;
        etiquetas.appendChild(item);
    });
    const motivo = document.createElement("p");
    motivo.textContent = instancia.motivo;
    caixa.append(titulo, etiquetas, motivo);
}

// Inicialização dos seletores e visualização inicial
criarSeletor("seletor-colunas", SELETORES_DE_COLUNAS, "grupoDeColunas", "colunas",
    chave => `${COLUNAS_POR_GRUPO[chave].length} atributos`);
criarSeletor("seletor-instancias", SELETORES_DE_INSTANCIAS, "filtroDeInstancias", "instancias",
    chave => `${INSTANCIAS.filter(i => chave === "todas" || i.tags.includes(chave)).length} instâncias`);

mostrarExplicacao("colunas_todas", "todas");
desenharTabela();