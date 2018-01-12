# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "actioncable"
  s.version = "5.1.4"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Pratik Naik", "David Heinemeier Hansson"]
  s.date = "2017-09-08"
  s.description = "Structure many real-time application concerns into channels over a single WebSocket connection."
  s.email = ["pratiknaik@gmail.com", "david@loudthinking.com"]
  s.homepage = "http://rubyonrails.org"
  s.licenses = ["MIT"]
  s.require_paths = ["lib"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.2.2")
  s.rubygems_version = "2.0.3"
  s.summary = "WebSocket framework for Rails."

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<actionpack>, ["= 5.1.4"])
      s.add_runtime_dependency(%q<nio4r>, ["~> 2.0"])
      s.add_runtime_dependency(%q<websocket-driver>, ["~> 0.6.1"])
    else
      s.add_dependency(%q<actionpack>, ["= 5.1.4"])
      s.add_dependency(%q<nio4r>, ["~> 2.0"])
      s.add_dependency(%q<websocket-driver>, ["~> 0.6.1"])
    end
  else
    s.add_dependency(%q<actionpack>, ["= 5.1.4"])
    s.add_dependency(%q<nio4r>, ["~> 2.0"])
    s.add_dependency(%q<websocket-driver>, ["~> 0.6.1"])
  end
end
