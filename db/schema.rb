# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_01_26_163549) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boards", force: :cascade do |t|
    t.string "board_title", null: false
    t.text "board_text", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "category_id"
    t.bigint "profile_id", null: false
    t.integer "item_id"
    t.integer "comments_count", default: 0, null: false
    t.index ["category_id"], name: "index_boards_on_category_id"
    t.index ["deleted_at"], name: "index_boards_on_deleted_at"
    t.index ["item_id"], name: "index_boards_on_item_id"
    t.index ["profile_id"], name: "index_boards_on_profile_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "category_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "board_id", null: false
    t.text "comment_text", null: false
    t.string "comment_title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "profile_id", null: false
    t.datetime "deleted_at"
    t.index ["board_id"], name: "index_comments_on_board_id"
    t.index ["deleted_at"], name: "index_comments_on_deleted_at"
    t.index ["profile_id"], name: "index_comments_on_profile_id"
  end

  create_table "drafts", force: :cascade do |t|
    t.jsonb "canvas"
    t.bigint "sub_user_id", null: false
    t.bigint "item_id", null: false
    t.integer "status"
    t.string "sub_image"
    t.string "item_image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_drafts_on_item_id"
    t.index ["sub_user_id"], name: "index_drafts_on_sub_user_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "item_image"
    t.jsonb "item_canvas"
    t.string "item_name"
    t.text "item_text"
    t.bigint "sub_user_id", null: false
    t.string "image_choice"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.text "episode"
    t.string "item_place"
    t.index ["deleted_at"], name: "index_items_on_deleted_at"
    t.index ["sub_user_id"], name: "index_items_on_sub_user_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.string "name"
    t.string "image_icon"
    t.string "color_code"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "profile_text"
    t.string "selected_option"
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_profiles_on_deleted_at"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "sub_users", force: :cascade do |t|
    t.string "sub_image"
    t.string "sub_color"
    t.jsonb "sub_canvas"
    t.string "sub_name"
    t.text "sub_text"
    t.string "icon_choice"
    t.bigint "profile_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "items_count", default: 0, null: false
    t.datetime "deleted_at"
    t.datetime "last_accessed_at"
    t.index ["deleted_at"], name: "index_sub_users_on_deleted_at"
    t.index ["profile_id"], name: "index_sub_users_on_profile_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "boards", "categories"
  add_foreign_key "boards", "profiles"
  add_foreign_key "comments", "boards"
  add_foreign_key "drafts", "items"
  add_foreign_key "drafts", "sub_users"
  add_foreign_key "items", "sub_users"
  add_foreign_key "profiles", "users"
  add_foreign_key "sub_users", "profiles"
end
