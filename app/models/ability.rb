class Ability
  include CanCan::Ability

  can :read, Subject, active: true, user_id: user.id

end
