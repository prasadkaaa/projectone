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
                dir("${WORKSPACE}") {
                    // Simulate deployment: update <h1>
                    bat '''
                    @echo off
                    set file=index.html
                    powershell -Command "(Get-Content %file%) -replace '<h1>.*</h1>', '<h1>chnages reflected 11</h1>' | Set-Content %file%"
                    echo Updated HTML content:
                    type %file%
                    '''
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                dir("${WORKSPACE}") {
                    publishHTML([
                        reportDir: '.',                // location of index.html
                        reportFiles: 'index.html',     // file to publish
                        reportName: 'My HTML Page',    // how it shows in Jenkins
                        allowMissing: false,           // fail if file missing
                        alwaysLinkToLastBuild: true,  // link always points to last build
                        keepAll: true                  // keep report for every build
                    ])
                }
            }
        }

        stage('Archive HTML') {
            steps {
                archiveArtifacts artifacts: 'index.html', allowEmptyArchive: true
            }
        }
    }

    post {
        success {
            echo "Deployment simulated! Check the HTML file in workspace."
        }
    }
}