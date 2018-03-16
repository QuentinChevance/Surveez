class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :surveys
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
