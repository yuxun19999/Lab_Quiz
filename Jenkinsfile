pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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

        stage('Build') {
            steps {
                // Add additional build steps if needed
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
    }
}
