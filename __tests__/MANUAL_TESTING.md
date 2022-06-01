# Manual testing

> A guide to not forget to test anything.

## Testing list

- [ ] Should authenticate with NEAR wallet when clicking on the call to actions
- [ ] Should disconnect from NEAR when clicking logout in the navbar
- [ ] The /grants page should require NEAR login
- [ ] Saving as draft the form should not verify field types
- [ ] Saving as draft should display last saved time
- [ ] Submitting the form should requires field validation
- [ ] Submitting should first save as draft, then validate and submit to mark the data as submitted, then redirect to the NEAR submission
- [ ] If submission to the blockchain not completed show button to finish
- [ ] Submission to the blockchain should create a proposal to the DAO
- [ ] If submission to the blockchain and to the backend we should see the details

## Status testing URLs

First complete the full form process then go to these URLs

- http://localhost:3000/grants/t3st.testnet-1 | Should show "You have successfully completed the application", "You will receive a follow up email to confirm your application has been received and separately when the review process has started. If you have questions that aren’t answered on near.org/grants, please contact us via email at grants@near.foundation." and only "Submit your Application" checked

- http://localhost:3000/grants/t3st.testnet-2 | Should show "You was invited to an intervie. Please, select available date." and "Evaluation & Approval" should be checked

- http://localhost:3000/grants/t3st.testnet-3 | Should show "Waiting for a interview" with the date of the interview and "Evaluation & Approval" should be checked

- http://localhost:3000/grants/t3st.testnet-4 | Should show "You have successfully completed the interview" and "You will receive a follow up email to confirm your application has been approved. If you have questions that aren’t answered on near.org/grants, please contact us via email at grants@near.foundation." with "Evaluation & Approval" checked and "Acceptance or Denial Notification" with a logo pending

- http://localhost:3000/grants/t3st.testnet-5 | Should show "Your application has been denied. Please, check comments and submit your application again." and the comments

- http://localhost:3000/grants/t3st.testnet-6 | Should show "Your funding has been approved, pleace verivy your account." and a "Verify account" button and "Acceptance or Denial Notification" should be checked

- http://localhost:3000/grants/t3st.testnet-7 | Should show "Thank you! We are currently checking your data" and its description, "Acceptance or Denial Notification" should be checked and "KYC" have a pending icon

- http://localhost:3000/grants/t3st.testnet-8 | Should show "Sorry, the KYC has been denied" and a button button and "Acceptance or Denial Notification" should be checked

- http://localhost:3000/grants/t3st.testnet-9 | Should show "Your account has been approved. To continue please sign the grant agreement." and a sign agreement button, KYC should be checked

- http://localhost:3000/grants/t3st.testnet-10 | Should show "You successfully signed the agreement and we are ready to payouts you up front part of grant." and Signing of agreement should be checked and Upfront payout should be pending

- http://localhost:3000/grants/t3st.testnet-11 | Should show "We have successfully completed the first payment. We are waiting for you at the onboarding meeting." and Upfront payout should be checked and Onboarding pending

- http://localhost:3000/grants/t3st.testnet-12

## API Implementation informations

- Check `__tests__/mocks/handlers.ts` to see how the API should behave
