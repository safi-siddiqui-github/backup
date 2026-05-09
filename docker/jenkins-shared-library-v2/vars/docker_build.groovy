def call(String credentialsId, String imageName){

    withCredentials(
        [
            usernamePassword(
                credentialsId: "${credentialsId}",
                passwordVariable: "password",
                usernameVariable: "username",
            )
        ]
    ){
        sh "docker build -t ${username}/${imageName}:latest ."
    }

}
