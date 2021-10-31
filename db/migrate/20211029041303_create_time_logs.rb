class CreateTimeLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :time_logs do |t|
      t.datetime :started_at
      t.datetime :ended_at

      t.timestamps
    end
  end
end
