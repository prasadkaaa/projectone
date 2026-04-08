pipeline {
    agent any

    environment {
        CF_API = "https://api.cf.us10-001.hana.ondemand.com"
        ORG = "6e3b2a68trial"
        SPACE = "dev"
    }


    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }
       stage('Build MTA (Final Stable)') {
    steps {
        bat '''
        echo Cleaning workspace...
        rmdir /s /q node_modules 2>nul
        rmdir /s /q mta_archives 2>nul
        del package-lock.json 2>nul

        docker run --rm ^
        -v %cd%:/workspace ^
        -w /workspace ^
        node:20 ^
        bash -c "apt-get update && apt-get install -y make && \
        npm ci && \
        npm install -g @sap/cds-dk && \
        npm install -g mbt && \
        cds build && \
        mbt build"
        '''
    }
}

        stage('Deploy to BTP') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'btp-credentials', usernameVariable: 'CF_USER', passwordVariable: 'CF_PASS')]) {
                bat '''
                docker run --rm ^
                -e CF_USER=%CF_USER% ^
                -e CF_PASS=%CF_PASS% ^
                -v %cd%:/workspace ^
                -w /workspace ^
                ppiper/cf-cli ^
                sh -c "cf install-plugin multiapps -f && \
                cf login -a https://api.cf.us10-001.hana.ondemand.com -u $CF_USER -p $CF_PASS -o 6e3b2a68trial -s dev && \
                echo 'Checking MTAR files...' && \
                ls -l mta_archives && \
                MTAR_FILE=$(ls mta_archives/*.mtar | head -n 1) && \
                echo Deploying $MTAR_FILE && \
                cf deploy \"$MTAR_FILE\""
                '''
                }
            }
       }
    }
}
