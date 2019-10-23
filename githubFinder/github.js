class Github {
    constructor() {
        this.client_id = '2a58397bdff952f64797';
        this.client_secret = '7813becae345a9a25747375aedfed62a3a890d16';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        
        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        
        const repos = await reposResponse.json();

        return {
            profile,
            repos
        }
    }
}