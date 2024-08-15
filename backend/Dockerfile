FROM amazoncorretto:21-alpine-full
EXPOSE 8080
ADD /target/byf-*.jar byf.jar
ENTRYPOINT ["java", "-jar", "byf.jar"]