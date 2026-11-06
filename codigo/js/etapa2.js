// Etapa 2 Dashboard JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCharts();
});

// Navigation Handling
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            navButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const activePane = document.getElementById(targetTab);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });
}

// Chart Initializations
function initCharts() {
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = '#334155';

    // 1. Pipeline Progression Chart
    const ctxPipeline = document.getElementById('chartPipelineProgression');
    if (ctxPipeline) {
        new Chart(ctxPipeline, {
            type: 'bar',
            data: {
                labels: ['Treino Inicial', 'Sem Duplicatas', 'Sem Conflitos', 'Sem Ruído', 'Final (SMOTETomek)'],
                datasets: [
                    {
                        label: 'Normais',
                        data: [52603, 45344, 44545, 44423, 44420],
                        backgroundColor: '#2a78d6'
                    },
                    {
                        label: 'Anomalias',
                        data: [3263, 3263, 1788, 1551, 22208],
                        backgroundColor: '#eb6834'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true }
                },
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }

    // 2. Cleaner Impact
    const ctxCleaner = document.getElementById('chartCleanerImpact');
    if (ctxCleaner) {
        new Chart(ctxCleaner, {
            type: 'bar',
            data: {
                labels: ['Treino Inicial (55.866)', 'Sem Duplicatas (48.607)', 'Sem Conflitos (46.333)'],
                datasets: [{
                    label: 'Quantidade de Linhas',
                    data: [55866, 48607, 46333],
                    backgroundColor: ['#2a78d6', '#1baf7a', '#CC75AF']
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 3. Service Groups Chart
    const ctxService = document.getElementById('chartServiceGroups');
    if (ctxService) {
        new Chart(ctxService, {
            type: 'bar',
            data: {
                labels: ['private_other', 'infrastructure_legacy', 'remote_access', 'netbios', 'auth_directory', 'icmp_diagnostic', 'file_transfer', 'email', 'dns_time', 'web'],
                datasets: [{
                    label: 'Instâncias no Treino',
                    data: [120, 240, 480, 850, 1100, 1450, 2100, 3200, 5800, 31093],
                    backgroundColor: '#CC75AF'
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 4. Normalization Comparison
    const ctxNorm = document.getElementById('chartNormalization');
    if (ctxNorm) {
        new Chart(ctxNorm, {
            type: 'line',
            data: {
                labels: ['0', '1K', '10K', '100K', '1M', '10M'],
                datasets: [
                    {
                        label: 'Original (Assimétrico)',
                        data: [45000, 800, 200, 50, 10, 2],
                        borderColor: '#eb6834',
                        backgroundColor: 'rgba(235, 104, 52, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Log + Standardized (Normalizado)',
                        data: [1000, 8000, 15000, 18000, 3000, 300],
                        borderColor: '#2a78d6',
                        backgroundColor: 'rgba(42, 120, 214, 0.1)',
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }

    // 5. Feature Importance
    const ctxImportance = document.getElementById('chartFeatureImportance');
    if (ctxImportance) {
        new Chart(ctxImportance, {
            type: 'bar',
            data: {
                labels: ['src_bytes', 'dst_bytes', 'count', 'srv_count', 'same_srv_rate', 'diff_srv_rate', 'dst_host_count', 'dst_host_srv_count', 'service_web', 'flag_SF', 'flag_S0', 'service_dns_time', 'dst_host_same_srv_rate', 'dst_host_diff_srv_rate', 'dst_host_rerror_rate'],
                datasets: [{
                    label: 'Importância XGBoost',
                    data: [0.18, 0.14, 0.11, 0.09, 0.07, 0.06, 0.05, 0.04, 0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.01],
                    backgroundColor: '#1baf7a'
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 6. Class Balance Chart
    const ctxBalance = document.getElementById('chartClassBalance');
    if (ctxBalance) {
        new Chart(ctxBalance, {
            type: 'bar',
            data: {
                labels: ['Antes (Instâncias Razoáveis)', 'Depois (SMOTETomek)'],
                datasets: [
                    {
                        label: 'Normais',
                        data: [44423, 44420],
                        backgroundColor: '#2a78d6'
                    },
                    {
                        label: 'Anomalias',
                        data: [1551, 22208],
                        backgroundColor: '#eb6834'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }
}
