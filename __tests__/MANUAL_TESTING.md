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

## API Implementation informations

- Check `__tests__/mocks/handlers.ts` to see how the API should behave
