# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "activemodel"
  s.version = "5.1.4"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["David Heinemeier Hansson"]
  s.date = "2017-09-08"
  s.description = "A toolkit for building modeling frameworks like Active Record. Rich support for attributes, callbacks, validations, serialization, internationalization, and testing."
  s.email = "david@loudthinking.com"
  s.homepage = "http://rubyonrails.org"
  s.licenses = ["MIT"]
  s.require_paths = ["lib"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.2.2")
  s.rubygems_version = "2.0.3"
  s.summary = "A toolkit for building modeling frameworks (part of Rails)."

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<activesupport>, ["= 5.1.4"])
    else
      s.add_dependency(%q<activesupport>, ["= 5.1.4"])
    end
  else
    s.add_dependency(%q<activesupport>, ["= 5.1.4"])
  end
end
