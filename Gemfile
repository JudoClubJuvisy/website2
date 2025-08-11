# Spécifie la source des gems
# Gemfile — build local Jekyll + plugins (Windows ok)
source "https://rubygems.org"

# Dépendances principales
gem "jekyll", "~> 4.3"
gem "webrick", "~> 1.8"     # serveur local pour Ruby 3+

# Plugins Jekyll
group :jekyll_plugins do
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-feed", "~> 0.17"   # si tu veux un /feed.xml (optionnel)
end

# Sur Windows : watcher de fichiers plus fiable (optionnel)
gem "wdm", ">= 0.1.0", platforms: [:mswin, :mingw, :x64_mingw]