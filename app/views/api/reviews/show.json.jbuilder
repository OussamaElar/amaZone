json.extract! @review, :id, :reviewer_id, :product_id, :rating, :title, :body 
json.extract! @review.user, :username