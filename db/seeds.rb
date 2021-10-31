
2.times do |index|
  TimeLog.create!({ started_at: Time.now - 1.days, ended_at: Time.now })
end
  
puts "2 completed time logs"