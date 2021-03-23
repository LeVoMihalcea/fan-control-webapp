pipeline{
    agent any

    stages {
        stage('Deployment'){
            steps{
                sh '''
                        docker-compose -f /opt/fan-control-webapp/docker-compose.yml down || true
                        docker image rm fan-control-webapp || true
                        docker build -t fan-control-webapp .
                        docker-compose -f /opt/fan-control-webapp/docker-compose.yml up -d
                '''
            }
        }
    }
}
