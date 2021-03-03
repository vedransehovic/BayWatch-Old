# This installs a Debian linux OS
FROM node as builder

# install dependencies
WORKDIR /home/server/baywatch

# COPY public src package.json package-lock.json static.json ./

COPY . ./

RUN npm install && npm audit fix





# start the service
# CMD ["npm","start"]
ENTRYPOINT npm start

EXPOSE 3000




# # DEBUG - print OS version
# # RUN cat /etc/os-release
# # RUN uname -r

# # install SSH client
# RUN apt-get update && apt-get install openssh-client

# # import host config
# COPY ssh_config .
# RUN touch /etc/ssh/ssh_config
# RUN cat ssh_config >> /etc/ssh/ssh_config

# # import deployment SSH key
# COPY baywatch-deploy.id_rsa .
# RUN cp baywatch-deploy.id_rsa /etc/ssh/baywatch-deploy.id_rsa && \
# 	eval $(ssh-agent) && ssh-add baywatch-deploy.id_rsa && \
# 	ssh-keyscan -H actbk-dev-staging.abelcine.com >> /etc/ssh/ssh_known_hosts

# # clone the git repo
# # RUN git clone abel_admin@actbk-dev-staging.abelcine.com:~/dev/baywatch.git /home/baywatch
# RUN git clone baywatch-staging:~/dev/baywatch.git /home/baywatch

# # install dependencies
# WORKDIR /home/baywatch
# RUN npm install && npm audit fix


# # start the service
# # CMD ["npm","start"]
# ENTRYPOINT npm start

# EXPOSE 3000


# # RUN npm run build

# # Copy build to new instance
# # FROM nginx
# # 
# # RUN curl -sL https://deb.nodesource.com/setup_current.x | bash - && \
# # 	apt-get install -y nodejs

# # COPY --from=builder /opt/baywatch/build/ /home/baywatch/
# # WORKDIR /home/baywatch
# # RUN npm start
# # EXPOSE 3000

