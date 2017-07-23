class CardSerializer

  def self.serialize(card)

    serialized_card = '{'

    serialized_card += '"front": "' + card.front + '", '

    serialized_card += '}'

    # # start with the open brace to create a valid JSON object
    # serialized_card = '{'
    #
    # serialized_card += '"id": ' + post.id.to_s + ', '
    # serialized_card += '"title": "' + post.title + '", '
    # sserialized_card += '"description": "' + post.description + '", '
    #
    # # the author association can also be represented in JSON
    # serialized_card += '"author": {'
    # serialized_card += '"name": "' + post.author.name + '"}'
    #
    # # and end with the close brace
    # serialized_card += '}'
  end
end
