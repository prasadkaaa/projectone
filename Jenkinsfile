pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'jenkinsMainBranch', 
                    url: 'https://github.com/prasadkaaa/projectone.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Update HTML') {
            steps {
                // Simulate deployment: update <h1>
                bat '''
                @echo off
                set file=index.html
                powershell -Command "(Get-Content %file%) -replace '<h1>.*</h1>', '<h1>prasad from Jenkins</h1>' | Set-Content %file%"
                echo Updated HTML content:
                type %file%
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment simulated! Check the HTML file in workspace."
        }
    }
}