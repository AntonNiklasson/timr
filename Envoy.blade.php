@servers(['digitalocean.droplet' => 'root@5.101.107.248'])

@task('deploy')
	cd /var/www/timr.antonniklasson.se
	git reset --hard HEAD
	git pull origin master
@endtask
