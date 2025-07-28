pipeline {
    agent any 

    environment {
        GNEWS_API_KEY = credentials('GNEWS_API_KEY')
    }
    stages {
        stage('Install Dependencies') {
            steps {
                script {
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
                    sh 'npm start'
                }
            }
        }
    }
}
