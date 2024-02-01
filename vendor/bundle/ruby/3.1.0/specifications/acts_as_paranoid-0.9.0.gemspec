# -*- encoding: utf-8 -*-
# stub: acts_as_paranoid 0.9.0 ruby lib

Gem::Specification.new do |s|
  s.name = "acts_as_paranoid".freeze
  s.version = "0.9.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "rubygems_mfa_required" => "true" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Zachary Scott".freeze, "Goncalo Silva".freeze, "Rick Olson".freeze]
  s.date = "2023-10-05"
  s.description = "Check the home page for more in-depth information.".freeze
  s.email = ["e@zzak.io".freeze]
  s.homepage = "https://github.com/ActsAsParanoid/acts_as_paranoid".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7.0".freeze)
  s.rubygems_version = "3.5.4".freeze
  s.summary = "Active Record plugin which allows you to hide and restore records without actually deleting them.".freeze

  s.installed_by_version = "3.5.4".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<activerecord>.freeze, [">= 6.1".freeze, "< 7.2".freeze])
  s.add_runtime_dependency(%q<activesupport>.freeze, [">= 6.1".freeze, "< 7.2".freeze])
  s.add_development_dependency(%q<appraisal>.freeze, ["~> 2.3".freeze])
  s.add_development_dependency(%q<minitest>.freeze, ["~> 5.14".freeze])
  s.add_development_dependency(%q<minitest-focus>.freeze, ["~> 1.3".freeze])
  s.add_development_dependency(%q<pry>.freeze, ["~> 0.14.1".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 13.0".freeze])
  s.add_development_dependency(%q<rake-manifest>.freeze, ["~> 0.2.0".freeze])
  s.add_development_dependency(%q<rdoc>.freeze, ["~> 6.3".freeze])
  s.add_development_dependency(%q<rubocop>.freeze, ["~> 1.52".freeze])
  s.add_development_dependency(%q<rubocop-minitest>.freeze, ["~> 0.32.2".freeze])
  s.add_development_dependency(%q<rubocop-packaging>.freeze, ["~> 0.5.2".freeze])
  s.add_development_dependency(%q<rubocop-performance>.freeze, ["~> 1.18".freeze])
  s.add_development_dependency(%q<rubocop-rake>.freeze, ["~> 0.6.0".freeze])
  s.add_development_dependency(%q<simplecov>.freeze, ["~> 0.22.0".freeze])
end
