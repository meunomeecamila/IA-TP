// Gerado a partir de base_treino.csv. 'linha' é o índice da linha no CSV (começando em 0).
const COLUNAS = [
    "duration", "protocol_type", "service", "flag", "src_bytes", "dst_bytes", "land", 
    "wrong_fragment", "urgent", "hot", "num_failed_logins", "logged_in", "num_compromised", 
    "root_shell", "su_attempted", "num_root", "num_file_creations", "num_shells", 
    "num_access_files", "num_outbound_cmds", "is_host_login", "is_guest_login", "count", 
    "srv_count", "serror_rate", "srv_serror_rate", "rerror_rate", "srv_rerror_rate", 
    "same_srv_rate", "diff_srv_rate", "srv_diff_host_rate", "dst_host_count", 
    "dst_host_srv_count", "dst_host_same_srv_rate", "dst_host_diff_srv_rate", 
    "dst_host_same_src_port_rate", "dst_host_srv_diff_host_rate", "dst_host_serror_rate", 
    "dst_host_srv_serror_rate", "dst_host_rerror_rate", "dst_host_srv_rerror_rate", 
    "src_bytes_kb", "dst_bytes_kb", "total_bytes", "same_srv_pct", "protocolo_cod", 
    "score_ids_legado", "tipo_alerta_soc", "tempo_resposta_analista_min", "class"
];

const INSTANCIAS = [
    {
        "linha": 0,
        "tags": ["categoricos", "ausentes", "desbalanceamento"],
        "destaques": ["serror_rate", "dst_host_diff_srv_rate", "tempo_resposta_analista_min"],
        "motivo": "Combinação comum (tcp, http, SF). Apresenta valores ausentes (null) em atributos como serror_rate, dst_host_diff_srv_rate e tempo_resposta_analista_min.",
        "valores": [0, "tcp", "http", "SF", 219.0, 3729, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, null, 0, 0.0, 0, 0, 0, 3.0, 4.0, null, 0.0, 0.0, 0.0, 1.0, 0.0, 0.5, 255.0, 255.0, 1.0, null, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2138671875, 3.6416015625, 3948.0, 100.0, 0, 0.176, "OK", null, "normal"]
    },
    {
        "linha": 2721,
        "tags": ["categoricos", "ausentes"],
        "destaques": ["src_bytes", "dst_host_srv_count", "dst_host_diff_srv_rate", "dst_host_same_src_port_rate"],
        "motivo": "Protocolo icmp com o serviço ecr_i (38% das linhas são anomalias). Contém múltiplos valores ausentes (src_bytes, dst_host_srv_count, etc.).",
        "valores": [0, "icmp", "ecr_i", "SF", null, 0, 0, 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 202.0, null, 1.0, null, null, 0.0, 0.0, 0.0, 0.0, 0.0, null, 0.0, null, 100.0, 2, 0.122, "OK", null, "anomaly"]
    },
    {
        "linha": 524,
        "tags": ["categoricos", "redundancia", "ausentes"],
        "destaques": ["rerror_rate", "dst_host_same_src_port_rate", "num_compromised"],
        "motivo": "Flag S0 (conexão sem resposta, 67,8% anomalias). Apresenta rerror_rate, dst_host_same_src_port_rate e num_compromised como null.",
        "valores": [0, "tcp", "private", "S0", 0.0, 0, 0, 0, 0, 0, 0, 0.0, null, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 12.0, 4.0, 1.0, 1.0, null, 0.0, 0.33, 0.33, 0.0, 255.0, 6.0, 0.02, 0.08, null, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 33.0, 0, 0.879, "ALERTA", 16.3, "anomaly"]
    },
    {
        "linha": 72,
        "tags": ["inconsistencia"],
        "destaques": ["protocol_type"],
        "motivo": "protocol_type escrito em maiúsculas ('TCP'). Há 1.186 linhas na base assim; sem padronização o modelo trata tcp e TCP como categorias distintas.",
        "valores": [0, "TCP", "http", "SF", 217.0, 1737, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 19.0, 23.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.09, 219.0, 255.0, 1.0, 0.0, 0.0, 0.01, 0.0, 0.0, 0.0, 0.0, 0.2119140625, 1.6962890625, 1954.0, 100.0, 0, 0.087, "OK", null, "normal"]
    },
    {
        "linha": 69,
        "tags": ["inconsistencia", "ausentes"],
        "destaques": ["src_bytes", "dst_host_same_src_port_rate", "tempo_resposta_analista_min"],
        "motivo": "flag escrita em minúsculas ('sf'). Na base existem 1.220 linhas assim. Apresenta src_bytes e dst_host_same_src_port_rate como null.",
        "valores": [0, "tcp", "http", "sf", null, 383, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 18.0, 53.0, 0.0, 0.02, 0.0, 0.0, 1.0, 0.0, 0.15, 255.0, 255.0, 1.0, 0.0, null, 0.0, 0.0, 0.0, 0.0, 0.0, null, 0.3740234375, null, 100.0, 0, 0.413, "OK", null, "normal"]
    },
    {
        "linha": 31,
        "tags": ["inconsistencia", "ausentes"],
        "destaques": ["src_bytes", "dst_host_srv_count", "dst_host_same_src_port_rate"],
        "motivo": "service com espaço no final ('http '). Ocorre em 667 linhas na base e faz o serviço inflar em categorias duplicadas. Possui dados nulos em src_bytes e dst_host_srv_count.",
        "valores": [0, "tcp", "http ", "SF", null, 5108, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 12.0, 12.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 255.0, null, 1.0, 0.0, null, 0.0, 0.0, 0.0, 0.0, 0.0, null, 4.98828125, null, 100.0, 0, 0.141, "OK", null, "normal"]
    },
    {
        "linha": 51813,
        "tags": ["inconsistencia"],
        "destaques": ["duration"],
        "motivo": "duration = -1308801: valor negativo impossível para duração de conexão. Existem 358 linhas com durações negativas na base.",
        "valores": [-1308801, "tcp", "telnet", "SF", 120.0, 14731, 0, 0, 0, 0, 0, 1.0, 2.0, 0.0, 0.0, 2, 0.0, 0, 0.0, 0, 0, 0, 1.0, 1.0, null, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 43.0, null, 0.14, 0.09, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1171875, 14.3857421875, 14851.0, 100.0, 0, 0.124, "OK", null, "normal"]
    },
    {
        "linha": 28287,
        "tags": ["inconsistencia"],
        "destaques": ["src_bytes", "src_bytes_kb"],
        "motivo": "src_bytes negativo (-2044), valor fisicamente impossível. Ocorre em 189 linhas e propaga-se para a coluna derivada src_bytes_kb.",
        "valores": [0, "tcp", null, "SF", -2044.0, 338, 0, 0, 0, 0, 0, 1.0, null, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, null, 1.0, 34.0, 166.0, 0.5, 0.09, 0.03, 0.01, 0.0, 0.0, 0.0, 0.0, -1.99609375, 0.330078125, -1706.0, 100.0, 0, 0.009, "OK", null, "normal"]
    },
    {
        "linha": 2166,
        "tags": ["inconsistencia"],
        "destaques": ["rerror_rate"],
        "motivo": "rerror_rate = 1,5: taxa acima de 1 (deveria estar entre 0 e 1). Ocorre em 683 linhas na base, sugerindo um erro de escala multiplicada por 10.",
        "valores": [0, "tcp", "http", "SF", 330.0, 292, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 10.0, 10.0, 0.0, 0.0, 1.5, 0.0, 1.0, 0.0, 0.0, 54.0, null, 1.0, 0.0, 0.02, 0.03, 0.0, 0.0, 0.0, 0.0, 0.322265625, 0.28515625, 622.0, 100.0, 0, 0.091, "OK", null, "normal"]
    },
    {
        "linha": 5008,
        "tags": ["inconsistencia", "extremo"],
        "destaques": ["count"],
        "motivo": "count = 550 ultrapassa o limite natural de 511 conexões da especificação do KDD. Ocorre em 464 linhas na base.",
        "valores": [0, "tcp", "http", "SF", null, 312, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 550.0, 11.0, 0.0, 0.0, 0.0, null, 1.0, 0.0, 0.18, 89.0, 255.0, 1.0, 0.0, 0.01, 0.02, 0.0, 0.0, 0.03, 0.04, null, 0.3046875, null, 100.0, 0, 0.0, "OK", null, "normal"]
    },
    {
        "linha": 19,
        "tags": ["inconsistencia", "redundancia"],
        "destaques": ["tipo_alerta_soc", "tempo_resposta_analista_min"],
        "motivo": "tipo_alerta_soc = OK com tempo_resposta_analista_min = 1.8 min. Estas duas colunas representam vazamento de dados por descreverem ações pós-evento.",
        "valores": [0, "tcp", "ftp_data", "SF", 151.0, 0, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 255.0, 113.0, 0.44, 0.05, 0.48, 0.0, 0.01, 0.02, 0.0, 0.0, 0.1474609375, 0.0, 151.0, 100.0, 0, 0.023, "OK", 1.8, "normal"]
    },
    {
        "linha": 1,
        "tags": ["inconsistencia", "ausentes"],
        "destaques": ["src_bytes", "dst_host_srv_count", "tempo_resposta_analista_min"],
        "motivo": "Atributos idênticos à linha 34400, porém com rótulo 'anomaly' enquanto a outra é 'normal'. Apresenta valores ausentes em src_bytes e dst_host_srv_count.",
        "valores": [0, "tcp", "finger", "SF", null, 443, 0, 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 223.0, null, 0.04, 0.03, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, null, 0.4326171875, null, 100.0, 0, 0.067, "OK", null, "anomaly"]
    },
    {
        "linha": 34400,
        "tags": ["inconsistencia", "ausentes"],
        "destaques": ["src_bytes", "dst_host_srv_count", "tempo_resposta_analista_min"],
        "motivo": "Par da linha 1: exatamente os mesmos atributos, mas com a classe oposta ('normal'). Apresenta valores ausentes em src_bytes e dst_host_srv_count.",
        "valores": [0, "tcp", "finger", "SF", null, 443, 0, 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 223.0, null, 0.04, 0.03, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, null, 0.4326171875, null, 100.0, 0, 0.067, "OK", null, "normal"]
    },
    {
        "linha": 13,
        "tags": ["redundancia", "ausentes"],
        "destaques": ["dst_host_same_src_port_rate", "dst_host_serror_rate", "tempo_resposta_analista_min"],
        "motivo": "Exemplo de atributos redundantes e presença de valores nulos em dst_host_same_src_port_rate, dst_host_serror_rate e tempo_resposta_analista_min.",
        "valores": [0, "tcp", "smtp", "SF", 1710.0, 332, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 120.0, 137.0, 0.53, 0.03, null, 0.01, null, 0.0, 0.0, 0.01, 1.669921875, 0.32421875, 2042.0, 100.0, 0, 0.137, "OK", null, "normal"]
    },
    {
        "linha": 44824,
        "tags": ["categoricos", "desbalanceamento"],
        "destaques": ["service"],
        "motivo": "O serviço http_2784 aparece em apenas 1 linha em toda a base de 69.833 conexões, exemplificando a cauda longa de serviços raros.",
        "valores": [0, "tcp", "http_2784", "REJ", 0.0, 0, 0, 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 509.0, 1.0, 0.07, 0.0, 0.92, 1.0, 0.0, 1.0, 0.0, 255.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.1, 0.0, 0.88, 1.0, 0.0, 0.0, 0.0, 0.0, 0, 0.803, "ALERTA", 7.3, "anomaly"]
    },
    {
        "linha": 22266,
        "tags": ["categoricos", "desbalanceamento", "ausentes"],
        "destaques": ["dst_host_same_src_port_rate"],
        "motivo": "A flag RSTOS0 é a mais rara da base (apenas 2 ocorrências em 69.833 conexões). Possui valor ausente em dst_host_same_src_port_rate.",
        "valores": [1, "tcp", "private", "RSTOS0", 0.0, 0, 0, 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 115.0, 3.0, 0.74, 0.67, 0.26, 0.33, 0.03, 0.37, 0.0, 255.0, 3.0, 0.01, 0.16, null, 0.0, 0.33, 0.67, 0.12, 0.33, 0.0, 0.0, 0.0, 3.0, 0, 0.8, "ALERTA", 39.7, "anomaly"]
    },
    {
        "linha": 55223,
        "tags": ["extremo"],
        "destaques": ["duration"],
        "motivo": "duration = 39.603.000: maior valor extremo de duração registrado na base (mediana é 0).",
        "valores": [39603000, "tcp", "imap4", "RSTR", 1.0, 0, 0, 0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 2.0, 2.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 255.0, 2.0, 0.01, 0.5, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0009765625, 0.0, 1.0, 100.0, 0, 0.779, "ALERTA", 8.7, "anomaly"]
    },
    {
        "linha": 56736,
        "tags": ["extremo", "ausentes"],
        "destaques": ["src_bytes", "src_bytes_kb", "total_bytes", "tempo_resposta_analista_min"],
        "motivo": "dst_bytes = 209.228.000 (valor extremo). Apresenta valores nulos em src_bytes, src_bytes_kb, total_bytes e tempo_resposta_analista_min.",
        "valores": [10, "tcp", "telnet", "SF", null, 209228000, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 154.0, 14.0, 0.09, 0.03, 0.01, 0.0, 0.0, 0.0, 0.03, 0.07, null, 204324.21875, null, 100.0, 0, 0.144, "OK", null, "normal"]
    },
    {
        "linha": 31498,
        "tags": ["extremo", "ausentes"],
        "destaques": ["dst_host_srv_serror_rate", "tempo_resposta_analista_min"],
        "motivo": "src_bytes = 21.945.520 (valor extremo). Apresenta ausências em dst_host_srv_serror_rate e tempo_resposta_analista_min.",
        "valores": [388, "tcp", "X11", "SF", 21945520.0, 98084, 0, 0, 0, 0, 0, 1.0, 0.0, 0.0, 0.0, 0, 0.0, 0, 0.0, 0, 0, 0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 255.0, 29.0, 0.11, 0.03, 0.0, 0.0, 0.0, null, 0.0, 0.0, 21431.171875, 95.78515625, 22043604.0, 100.0, 0, 0.0, "OK", null, "normal"]
    }
];