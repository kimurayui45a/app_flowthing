# -*- encoding: utf-8 -*-
# stub: google-apis-monitoring_v3 0.58.0 ruby lib

Gem::Specification.new do |s|
  s.name = "google-apis-monitoring_v3".freeze
  s.version = "0.58.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/googleapis/google-api-ruby-client/issues", "changelog_uri" => "https://github.com/googleapis/google-api-ruby-client/tree/main/generated/google-apis-monitoring_v3/CHANGELOG.md", "documentation_uri" => "https://googleapis.dev/ruby/google-apis-monitoring_v3/v0.58.0", "source_code_uri" => "https://github.com/googleapis/google-api-ruby-client/tree/main/generated/google-apis-monitoring_v3" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Google LLC".freeze]
  s.date = "2024-03-10"
  s.description = "This is the simple REST client for Cloud Monitoring API V3. Simple REST clients are Ruby client libraries that provide access to Google services via their HTTP REST API endpoints. These libraries are generated and updated automatically based on the discovery documents published by the service, and they handle most concerns such as authentication, pagination, retry, timeouts, and logging. You can use this client to access the Cloud Monitoring API, but note that some services may provide a separate modern client that is easier to use.".freeze
  s.email = "googleapis-packages@google.com".freeze
  s.homepage = "https://github.com/google/google-api-ruby-client".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7".freeze)
  s.rubygems_version = "3.5.4".freeze
  s.summary = "Simple REST client for Cloud Monitoring API V3".freeze

  s.installed_by_version = "3.5.4".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<google-apis-core>.freeze, [">= 0.14.0".freeze, "< 2.a".freeze])
end
