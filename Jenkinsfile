pipeline {
    agent any 

    environment {
        IMAGE_NAME = 'news-api'
        CONTAINER_NAME = 'news-api'
        GNEWS_API_KEY = credentials('GNEWS_API_KEY')
    }

    tools {
        nodejs 'Node 24.4.1'
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git url: 'https://github.com/ibrahnerd7/news-api.git'
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
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }
        stage('Stop and Remove Existing Container') {
            steps {
                script {
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                }
            }
        }
        stage('Run New Docker Container') {
            steps {
                script {
                    sh "docker run -d --name ${CONTAINER_NAME} -p ${PORT}:${PORT} -e GNEWS_API_KEY=${GNEWS_API_KEY} ${IMAGE_NAME}"
                }
            }
        }
    }
}
