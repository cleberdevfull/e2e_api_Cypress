pipeline {
    agent any

    stages {
        stage('Clonar o repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/cleberdevfull/e2e_api_Cypress.git'
           }
        }
        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }
        stage('Executar testes') {
            steps {
                bat 'set NO_COLOR=1 npm run cy:run'
            }
        } 
    }
}
