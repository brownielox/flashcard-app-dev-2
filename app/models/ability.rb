class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, Card
    can :create, Card
    unless user.nil?
      can :update, Card, { user_id: user.id }
    end
  end
end
