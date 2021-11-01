class TimeLog < ApplicationRecord
    validate :check_dates, on: :update

    def check_dates
        if started_at > ended_at 
            errors.add(:time_log, "Started at should be less than ended at")
        end
    end
end
