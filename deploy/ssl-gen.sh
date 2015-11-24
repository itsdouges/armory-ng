mkdir -p ~/lets_encrypt/{etc,lib}

docker rm -f letsencrypt

docker run -it --rm -p 443:443 -p 80:80 --name letsencrypt \
	-v "//etc//letsencrypt:/etc/letsencrypt" \
	-v "//var//lib/letsencrypt:/var/lib/letsencrypt" \
	quay.io/letsencrypt/letsencrypt:latest \
	auth