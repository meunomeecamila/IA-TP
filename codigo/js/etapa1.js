// Visualizador da etapa 1. Depende de dados/amostra_instancias.js (COLUNAS, INSTANCIAS, PANORAMA).

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

// Quando uma instância tem várias etiquetas, a primeira desta lista define a cor do destaque
const PRIORIDADE_DAS_ETIQUETAS = ["inconsistencia", "redundancia", "extremo", "desbalanceamento", "categoricos"];
const ROTULO_DA_ETIQUETA = {
    categoricos: "Atributo categórico", inconsistencia: "Inconsistência", redundancia: "Redundância",
    desbalanceamento: "Desbalanceamento", extremo: "Valor extremo",
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
    { chave: "redundancia", rotulo: "Redundâncias" },
    { chave: "desbalanceamento", rotulo: "Desbalanceamento" },
    { chave: "extremo", rotulo: "Valores extremos" },
];

const EXPLICACOES = {
    colunas_todas: {
        titulo: "Todos os atributos",
        paragrafos: [
            "Cada linha da tabela é uma instância: uma conexão de rede registrada na base. Cada coluna é um atributo, uma característica medida dessa conexão. São 41 atributos descritivos, mais a classe (normal ou anomaly), que é o que os modelos vão tentar prever.",
            "Os atributos formam quatro grupos, e a cor do cabeçalho mostra a qual grupo cada coluna pertence: categóricos, binários, contagens e tamanhos, e taxas. Escolha um grupo acima para ver só as colunas dele.",
        ],
    },
    colunas_categoricos: {
        titulo: "O que são atributos categóricos?",
        paragrafos: [
            "Atributos categóricos (ou simbólicos) guardam rótulos, não quantidades. São três: protocol_type (tcp, udp ou icmp), service (o serviço de destino, com 70 valores, como http e smtp) e flag (o estado da conexão, com 11 valores: SF indica conexão concluída normalmente e S0, tentativa sem resposta).",
            "Não dá para somar nem calcular distância entre rótulos, então eles precisam ser convertidos em números antes da modelagem (Etapa 2). Eles são muito informativos: por exemplo, quase todas as conexões com flag S0 são anomalias.",
        ],
    },
    colunas_binarios: {
        titulo: "O que são atributos binários?",
        paragrafos: [
            "Atributos binários só aceitam 0 ou 1, como uma resposta de sim ou não. São cinco: land (origem e destino são o mesmo host e porta), logged_in (login bem-sucedido), root_shell (obteve acesso de administrador), is_host_login (login em conta privilegiada) e is_guest_login (login de convidado).",
            "Como já são números, não precisam de conversão. O valor 1 costuma ser raro: land = 1 aparece em apenas 25 das 125.973 linhas.",
        ],
    },
    colunas_contagens: {
        titulo: "O que são atributos de contagem e tamanho?",
        paragrafos: [
            "São 18 atributos numéricos que contam eventos ou medem tamanho: duration (segundos), src_bytes e dst_bytes (bytes enviados e recebidos), hot, num_failed_logins, num_compromised, count (conexões ao mesmo host nos últimos 2 segundos), entre outros.",
            "Na maioria deles quase todos os valores são 0, com poucos valores muito altos, o que exige normalização (Etapa 2). Um deles, num_outbound_cmds, vale 0 em todas as linhas e não traz informação nenhuma.",
        ],
    },
    colunas_taxas: {
        titulo: "O que são as taxas (valores de 0 a 1)?",
        paragrafos: [
            "São 15 atributos entre 0 e 1 que medem a proporção de conexões recentes com certa característica, como serror_rate (com erro de SYN), rerror_rate (rejeitadas) e same_srv_rate (ao mesmo serviço).",
            "Muitas medem quase a mesma coisa em janelas diferentes: as que começam com dst_host_ usam as últimas 100 conexões ao host de destino, e as demais usam os últimos 2 segundos. Por isso várias são redundantes entre si.",
        ],
    },
    instancias_todas: {
        titulo: "Todas as instâncias da amostra",
        paragrafos: [
            "São 15 instâncias escolhidas à mão entre as 125.973 linhas de base_treino.csv, para ilustrar cada característica da base. Escolha uma categoria acima para ficar só com as instâncias dela.",
            "Em cada instância, as células com fundo colorido mostram exatamente onde está o ponto de interesse.",
        ],
    },
        instancias_inconsistencia: {
        titulo: "O que são inconsistências?",
        paragrafos: [
            "Uma inconsistência acontece quando os valores contradizem o significado do atributo ou outros atributos da mesma linha. Na base há cinco tipos principais: categorias escritas de formas diferentes, valores impossíveis, escalas erradas, relações lógicas violadas e valores ausentes.",
            "Categorias: protocol_type tem 6 valores onde deveria ter 3 (tcp e TCP, udp e UDP, icmp e ICMP), flag tem 19 onde deveria ter 11 (SF e sf, REJ e rej) e service tem espaço no final em 1.292 linhas, o que faz 96 valores serem na verdade 67. Cerca de 4.000 linhas são afetadas, e sem padronização o modelo trata tcp e TCP como categorias diferentes.",
            "Valores impossíveis: duration negativa em 358 linhas, src_bytes negativo em 189 e total_bytes negativo em 73. Taxas que deveriam estar entre 0 e 1 chegam a 10 (rerror_rate em 683 linhas, dst_host_same_srv_rate em 670, dst_host_diff_srv_rate em 623, dst_host_srv_diff_host_rate em 739 e dst_host_srv_rerror_rate em 714), o que sugere erro de escala de 10 vezes. Os contadores também parecem multiplicados por 1000: count e srv_count passam do limite de 511 (464 e 507 linhas, máximo de 512.000) e dst_host_count passa de 255 (912 linhas, máximo de 256.000).",
            "Relações lógicas violadas: same_srv_rate somado a diff_srv_rate deveria dar 1, mas difere em 5.823 de 63.297 linhas (9,2%), chegando a 1,5. Em 284 linhas logged_in vale 0, mas num_compromised, num_root, num_file_creations ou root_shell estão acima de 0, e em 6 linhas há login de convidado sem estar logado. Em 1.998 registros com tipo_alerta_soc igual a OK existe tempo de resposta do analista, e 1.005 registros com ALERTA estão sem tempo. Há ainda 1.702 combinações de atributos idênticos com classes opostas.",
            "Valores ausentes: tempo_resposta_analista_min tem 91,4% de nulos, src_bytes (e as colunas derivadas) 40,0%, dst_host_srv_count 39,9%, dst_host_serror_rate 30,6% e dst_host_same_src_port_rate 28,0%. Os demais atributos com nulos ficam entre 3,5% e 6,8%.",
            "O risco é o modelo aprender padrões que não existem. Esses casos precisam ser investigados e, quando for o caso, corrigidos (ajustando a escala), convertidos em nulo ou removidos antes do treino.",
        ],
    },
    instancias_redundancia: {
        titulo: "O que são redundâncias?",
        paragrafos: [
            "Redundância é informação repetida: linhas duplicadas ou atributos que dizem a mesma coisa. A base tem 11.355 linhas duplicadas exatas (16,3%), que podem cair no treino e na validação ao mesmo tempo e inflar o resultado (vazamento de dados).",
            "Atributos que são cópias de outros: src_bytes_kb e dst_bytes_kb são src_bytes e dst_bytes divididos por 1024; total_bytes é src_bytes mais dst_bytes; same_srv_pct é same_srv_rate vezes 100; protocolo_cod é a codificação numérica de protocol_type (tcp 0, udp 1, icmp 2). Além disso, total_bytes e as colunas _kb herdam os 40% de nulos de src_bytes, mesmo com dst_bytes completo.",
            "Atributos sem informação: num_outbound_cmds vale 0 em todas as linhas, e is_host_login (2 linhas com valor 1), num_shells (34), urgent (6) e land (10) são quase constantes. Também há pares muito correlacionados: serror_rate e srv_serror_rate (0,97) e dst_host_serror_rate e dst_host_srv_serror_rate (0,87).",
            "Três colunas parecem ter sido produzidas depois da detecção do evento e funcionam como um espelho da classe: score_ids_legado (média de 0,71 nas anomalias contra 0,16 nas normais), tipo_alerta_soc (ALERTA em 3.379 das 4.079 anomalias) e tempo_resposta_analista_min. Elas não estariam disponíveis na hora de prever e inflam artificialmente o desempenho (vazamento de alvo).",
            "Atributos redundantes aumentam a dimensionalidade sem acrescentar informação e serão tratados na Etapa 2.",
        ],
    },
    instancias_desbalanceamento: {
        titulo: "O que é desbalanceamento?",
        paragrafos: [
            "Desbalanceamento é quando algumas categorias têm muito mais exemplos que outras. A classe está relativamente equilibrada (53,5% normais e 46,5% anomalias), mas os atributos categóricos não: http cobre 32% das linhas de service, enquanto 48 dos 70 serviços têm menos de 0,5% cada um e http_2784 aparece uma única vez.",
            "Categorias raras dão pouco material para o modelo aprender. Nesta base a classe só diz normal ou anomaly, sem o tipo de ataque. As barras abaixo mostram a distribuição da base inteira.",
        ],
    },
    instancias_extremo: {
        titulo: "O que são valores extremos?",
        paragrafos: [
            "Valores extremos (outliers) ficam muito acima ou abaixo do padrão da coluna. Na amostra: src_bytes com mais de 1 bilhão de bytes e um num_root muito alto, quando quase todas as linhas têm valores pequenos ou 0.",
            "Nem todo extremo é um erro, pode ser um ataque real. Mas eles distorcem normalizações como Min-Max e métodos baseados em distância, e por isso serão tratados com uma transformação logarítmica na Etapa 2.",
        ],
    },
};

const estado = { grupoDeColunas: "todas", filtroDeInstancias: "todas", linhaSelecionada: null };

const formatarValor = valor =>
    typeof valor === "number" ? valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) : valor;
const etiquetaPrincipal = instancia => PRIORIDADE_DAS_ETIQUETAS.find(tag => instancia.tags.includes(tag));
const instanciasVisiveis = () => INSTANCIAS.filter(instancia =>
    estado.filtroDeInstancias === "todas" || instancia.tags.includes(estado.filtroDeInstancias));

function criarSeletor(idDoContainer, opcoes, chaveDoEstado, prefixoDaExplicacao, detalhe) {
    const container = document.getElementById(idDoContainer);
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
    const painel = document.getElementById("viz-explicacao");
    painel.className = `viz-explicacao cor-${chaveDaCor}`;
    document.getElementById("viz-explicacao-titulo").textContent = explicacao.titulo;
    const texto = document.getElementById("viz-explicacao-texto");
    texto.replaceChildren(...explicacao.paragrafos.map(conteudo => {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = conteudo;
        return paragrafo;
    }));
    const panorama = document.getElementById("viz-panorama");
    panorama.hidden = chave !== "instancias_desbalanceamento";
    if (!panorama.hidden) desenharPanorama(panorama);
}

function desenharPanorama(painel) {
    painel.replaceChildren();
    [["class", "Classe"], ["protocol_type", "protocol_type"], ["flag", "flag"], ["service", "service"]].forEach(([chave, titulo]) => {
        const bloco = document.createElement("div");
        bloco.className = "viz-distribuicao";
        const cabecalho = document.createElement("h3");
        cabecalho.textContent = `${titulo} na base inteira (${PANORAMA.total.toLocaleString("pt-BR")} linhas)`;
        bloco.appendChild(cabecalho);
        PANORAMA[chave].forEach(([categoria, quantidade]) => {
            const percentual = quantidade / PANORAMA.total * 100;
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
    tabela.replaceChildren();

    const cabecalho = tabela.createTHead().insertRow();
    cabecalho.appendChild(criarCabecalho("linha", "cor-todas"));
    nomesDasColunas.forEach(nome => cabecalho.appendChild(
        criarCabecalho(nome, `cor-${estado.grupoDeColunas === "todas" ? grupoDaColuna(nome) : estado.grupoDeColunas}`)));
    cabecalho.appendChild(criarCabecalho("class", "cor-todas"));

    const corpo = tabela.createTBody();
    linhas.forEach(instancia => {
        const classeDeCor = `cor-${etiquetaPrincipal(instancia)}`;
        const tr = corpo.insertRow();
        tr.tabIndex = 0;
        tr.dataset.linha = instancia.linha;
        tr.setAttribute("aria-selected", String(instancia.linha === estado.linhaSelecionada));
        const selecionar = () => selecionarLinha(instancia.linha);
        tr.addEventListener("click", selecionar);
        tr.addEventListener("keydown", evento => {
            if (evento.key === "Enter" || evento.key === " ") { evento.preventDefault(); selecionar(); }
        });

        const celulaLinha = tr.insertCell();
        celulaLinha.textContent = instancia.linha;
        celulaLinha.className = `viz-marca ${classeDeCor}`;
        [...nomesDasColunas, "class"].forEach(nome => {
            const celula = tr.insertCell();
            const valor = instancia.valores[COLUNAS.indexOf(nome)];
            celula.textContent = formatarValor(valor);
            if (typeof valor === "string") celula.classList.add("viz-texto");
            if (nome === "class") celula.classList.add(valor === "anomaly" ? "viz-anomalia" : "viz-normal");
            if (instancia.destaques.includes(nome)) celula.classList.add("viz-destaque", classeDeCor);
        });
    });

    document.getElementById("viz-contagem").textContent =
        `Mostrando ${linhas.length} de ${INSTANCIAS.length} instâncias e ${nomesDasColunas.length} de ${COLUNAS.length - 1} atributos, mais a classe.`;

    if (!linhas.some(i => i.linha === estado.linhaSelecionada)) {
        selecionarLinha(linhas.length ? linhas[0].linha : null);
    }
}

function selecionarLinha(numeroDaLinha) {
    estado.linhaSelecionada = numeroDaLinha;
    document.querySelectorAll("#viz-tabela tbody tr").forEach(tr =>
        tr.setAttribute("aria-selected", String(Number(tr.dataset.linha) === numeroDaLinha)));

    const caixa = document.getElementById("viz-motivo");
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
        item.textContent = ROTULO_DA_ETIQUETA[tag];
        etiquetas.appendChild(item);
    });
    const motivo = document.createElement("p");
    motivo.textContent = instancia.motivo;
    caixa.append(titulo, etiquetas, motivo);
}

criarSeletor("seletor-colunas", SELETORES_DE_COLUNAS, "grupoDeColunas", "colunas",
    chave => `${COLUNAS_POR_GRUPO[chave].length} atributos`);
criarSeletor("seletor-instancias", SELETORES_DE_INSTANCIAS, "filtroDeInstancias", "instancias",
    chave => `${INSTANCIAS.filter(i => chave === "todas" || i.tags.includes(chave)).length} instâncias`);
mostrarExplicacao("colunas_todas", "todas");
desenharTabela();