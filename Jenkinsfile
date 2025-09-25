pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Shreeraksha9/example-react.git', branch: 'dev'
            }
        }

        stage('Install Dependencies') {
            steps {
                
                    bat 'npm install'
                
            }
        }

        stage('Running') {
            steps {
                
                    bat 'npm run build'
                
            }
        }

        // stage('Build') {
        //     steps {
        //         dir('login-app') {
        //             bat 'npm start'
        //         }
        //     }
        // }

        stage('Archive Build') {
            steps {
                
                    archiveArtifacts artifacts: 'build/**', fingerprint: true
                
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonar') {
                    bat 'sonar-scanner'
                }
            }
        }
    }
}