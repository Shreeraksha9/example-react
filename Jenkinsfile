pipeline {
    agent any

    // tools {
    //     nodejs "Node18"   // Make sure you configure NodeJS 18 under Jenkins -> Global Tool Configuration
    // }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Shreeraksha9/example-react.git', branch: 'dev'
            }
        }

        stage('Clean Workspace') {
            steps {
                bat 'rmdir /s /q node_modules || exit 0'
                bat 'del package-lock.json || exit 0'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npm install --save-dev sonar-scanner'
            }
        }

        stage('Run Tests with Coverage') {
            steps {
                bat 'npm test -- --coverage --watchAll=false'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonar') {
                    // Pass coverage report to SonarQube
                    bat '.\\node_modules\\.bin\\sonar-scanner.cmd'
                }
            }
        }
    }
}
