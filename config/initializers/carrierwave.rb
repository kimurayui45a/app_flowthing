CarrierWave.configure do |config|
  config.fog_provider = 'fog/google'                        # required
  config.fog_credentials = {
    provider:                         'Google',
    google_project:                   Rails.application.credentials.google[:google_project_id],
    google_json_key_string:           Rails.application.credentials.google[:google_json_key]
  }
  config.fog_directory = Rails.application.credentials.google[:google_bucket_name]
end