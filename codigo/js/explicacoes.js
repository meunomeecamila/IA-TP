const EXPLICACOES = {
    colunas_todas: {
        titulo: "Todos os atributos",
        paragrafos: [
            "Cada linha da tabela representa uma conexão de rede (instância) registrada na base NSL-KDD.",
            "São 41 atributos descritivos divididos em grupos, além do atributo de classe (normal ou anomaly)."
        ]
    },
    colunas_categoricos: {
        titulo: "Atributos Categóricos",
        paragrafos: [
            "Atributos de texto simbólicos: protocol_type (3 valores após padronização), service (67 valores reais) e flag (11 valores).",
            "Exigem codificação simbólico-numérica (One-Hot Encoding) para uso nos classificadores."
        ]
    },
    colunas_binarios: {
        titulo: "Atributos Binários",
        paragrafos: [
            "Valores numéricos 0 ou 1 referentes a flags de acesso (ex.: land, logged_in, root_shell, is_host_login, is_guest_login)."
        ]
    },
    colunas_contagens: {
        titulo: "Contagens e Tamanhos",
        paragrafos: [
            "Medidas numéricas de tráfego como duração, src_bytes, dst_bytes e contadores de conexões em janelas de tempo."
        ]
    },
    colunas_taxas: {
        titulo: "Taxas (Valores de 0 a 1)",
        paragrafos: [
            "Proporções de erros e serviços nas conexões recentes (ex.: serror_rate, rerror_rate, same_srv_rate)."
        ]
    },
    instancias_todas: {
        titulo: "Todas as instâncias da amostra",
        paragrafos: [
            "Amostra de 15 instâncias representativas selecionadas para ilustrar os problemas e padrões identificados na Análise Exploratória."
        ]
    },
    instancias_inconsistencia: {
        titulo: "Inconsistências e Domínio",
        paragrafos: [
            "Inconsistências de domínio como valores negativos em duration ou src_bytes, taxas acima de 1.0 (ex.: rerror_rate = 10 por erro de escala) e contadores inflados acima dos limites normais."
        ]
    },
    instancias_ausentes: {
        titulo: "Valores Ausentes",
        paragrafos: [
            "Mapeamento de 292.542 ausências na base completa. A taxa de ausência em service e flag (~6%) ocorre proporcionalmente em ambas as classes, confirmando ausência aleatória sem sinal direto da classe."
        ]
    },
    instancias_redundancia: {
        titulo: "Redundâncias e Vazamento",
        paragrafos: [
            "Linhas duplicadas e atributos derivados/redundantes (ex.: src_bytes_kb, total_bytes, protocolo_cod). Inclui atributos pós-incidente removidos por vazamento de dados (tipo_alerta_soc, tempo_resposta_analista_min, score_ids_legado)."
        ]
    },
    instancias_desbalanceamento: {
        titulo: "Desbalanceamento de Classes e Categóricos",
        paragrafos: [
            "A classe apresenta forte desbalanceamento no ambiente real (94,16% normal vs. 5,84% anomalias na amostragem). Serviços raros e flags desbalanceadas também exigem tratamento na modelagem."
        ]
    },
    instancias_extremo: {
        titulo: "Valores Extremos (Outliers)",
        paragrafos: [
            "Valores atípicos com ordens de grandeza muito superiores ao padrão (ex.: src_bytes acima de 1 bilhão), que exigem transformações de escala (como logarítmica ou padronização)."
        ]
    }
};

const PANORAMA_TREINO = {
    total: 69833,
    class: [
        ["normal", 65754],
        ["anomaly", 4079]
    ],
    protocol_type: [
        ["tcp", 56010],
        ["udp", 12180],
        ["icmp", 1643]
    ]
};