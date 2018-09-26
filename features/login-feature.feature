Feature: Shopper can add an item to their Grocery List
  As a system user
  I want to login to the system
  So that I can use all of the system's features

  Scenario: I navigate to login page
    Given I am not logged in
    When I add username and password and submit
    Then I am able to login to the system
