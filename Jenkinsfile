pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/yuxun19999/Lab_Quiz.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Dependency Check') {
            steps {
                // Run OWASP Dependency-Check for checking dependencies for known vulnerabilities
                sh 'docker run --rm -v $PWD:/usr/src/app owasp/dependency-check --scan /usr/src/app'
            }
        }

        stage('Run Tests') {
            steps {
                // Run integration tests (assuming you have an npm script for integration tests)
                sh 'npm run integration-test'
            }
        }

        stage('Code Quality Check via SonarQube') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=Lab \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://sonarqube:9000 \
                            -Dsonar.token=sqp_da8194385ac933b5cb87dbe0deb173c9638548ca"
                    }
                }
            }
        }

        stage('UI Testing') {
            steps {
                // Assuming you have Selenium tests in a separate directory (e.g., ./tests)
                sh 'npm run ui-test'
            }
        }

        stage('Deploy') {
            steps {
                // Add deployment steps (e.g., deploy to a server, push to Docker registry, etc.)
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }

        failure {
            echo 'Pipeline failed!'
        }

        always {
            recordIssues enabledForFailure: true, tool: sonarQube()
        }
    }
}



