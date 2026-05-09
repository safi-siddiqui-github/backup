// Library : Source github
@Library("jenkins-shared-library") _

pipeline {
    
    // agent dev
    agent { label "dev" }

    stages {

        stage("git") {
            steps {
                git_clone('https://github.com/safi-siddiqui-github/two-tier-flask-app.git', 'main')
            }
        }

        stage("trivy") {
            steps {
                trivy_scan()
            }
        }
        
        stage("docker") {
            steps {
                docker_login('docker_hub')
                docker_build('docker_hub', 'ttfa_img')
                docker_push('docker_hub', 'ttfa_img')
                docker_compose_up_rebuild()
                docker_prune()
            }
        }
        
    }

    post {
        success {
            emailext from: "safi-siddiqui.com",
                subject: "Build Success",
                body: "Build Success: TTFA",
                to: "safisiddiqui.private@gmail.com"
        }

        failure {
            emailext from: "safi-siddiqui.com",
                subject: "Build Failed",
                body: "Build Failed: TTFA",
                to: "safisiddiqui.private@gmail.com"
        }
    }
}