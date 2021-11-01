class AddUsernameToTimeLogs < ActiveRecord::Migration[6.0]
  def change
    add_column :time_logs, :username, :string
  end
end
