pipeline {
    agent any 

    environment {
        GNEWS_API_KEY = credentials('GNEWS_API_KEY')
    }

    tools {
        nodejs 'Node 24.4.1'
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install pm2 -g'
                    sh 'npm install'
                }
            }
        }
  
        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Start Server') {
            steps {
                script {
                    sh 'npm run start-server'
                }
            }
        }
    }
}
