# 🔐 NSL-KDD - Análise de Dados para Detecção de Intrusão em Redes

Projeto acadêmico desenvolvido na disciplina de **Inteligência Artificial**, com foco na análise de dados, pré-processamento e aplicação de algoritmos de Aprendizado de Máquina para a detecção de intrusões em redes de computadores.

O projeto utiliza a base de dados NSL-KDD para investigar características do tráfego de rede, identificar possíveis problemas de qualidade dos dados e desenvolver modelos capazes de classificar conexões como tráfego normal ou anômalo.

Como parte da proposta, será desenvolvida uma plataforma web interativa para apresentar visualmente os dados, as etapas de processamento e os resultados obtidos pelos modelos de classificação.

## 📊 Sobre a base de dados

A NSL-KDD é uma base utilizada em pesquisas de segurança da informação e Aprendizado de Máquina para detecção de intrusões em redes.  

A base contém atributos que descrevem conexões de rede, incluindo duração, protocolo, serviço, quantidade de bytes transmitidos, taxas de erro e indicadores relacionados a atividades suspeitas.  

Os registros possuem informações de classificação que permitem distinguir o tráfego normal de diferentes tipos de ataques.

O projeto utiliza os conjuntos oficiais de treinamento e teste:  

- **KDDTrain+:** utilizado no desenvolvimento dos experimentos e no treinamento dos modelos.  

- **KDDTest+:** reservado para a avaliação final dos modelos.  

A separação original entre treinamento e teste será preservada, evitando vazamento de dados e garantindo uma comparação metodologicamente adequada.  

## 🖥️ Plataforma de visualização

Será desenvolvido um site para apresentar os dados de maneira visual, organizada e interativa, facilitando a análise exploratória.

### 🔎 Tutorial


## 📈 Etapas do projeto

| Etapa | Descrição | Status |
|:---:|:---|:---|
| 1. Análise exploratória dos dados | Caracterização da base NSL-KDD; identificação das classes, desbalanceamento, atributos categóricos, inconsistências, redundâncias e possíveis problemas de vazamento de dados. | Feito ✅ |
| 2. Pré-processamento | Implementação e comparação de pelo menos 2 técnicas de balanceamento, 1 técnica de codificação, 1 transformação numérica e 1 técnica de redução de dimensionalidade ou seleção de instâncias. Tratamento dos dados redundantes/inconsistentes. | Em andamento ⏳ |
| 3. Construção e avaliação dos classificadores | Treinamento de pelo menos 3 algoritmos de classificação; comparação das combinações de pré-processamento e algoritmos; avaliação por validação cruzada e escolha do melhor modelo. | Em breve 🔜 |
| 4. Competição e apresentação | Avaliação final no KDDTest+, cálculo do F1-macro, ranking das equipes, explicabilidade do melhor modelo e discussão dos resultados. | Em breve 🔜 |

## 👥 Equipe

- Ane Madjarian
- Bruno Bicalho
- Camila Menezes
- Guilherme zuim
- Isabel Borges

## 👩‍🏫 Orientadora

`Cristiane Nobre`
