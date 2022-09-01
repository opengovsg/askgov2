import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Flex, FormLabel, Input, useMultiStyleConfig } from '@chakra-ui/react'

import { asErr } from '../../util'
import { useOtpGenerateMutation, useOtpVerifyMutation } from '../../api'
import { useAuth } from '../../contexts/AuthContext'
import Spinner from '../Spinner/Spinner.component'
import { useStyledToast } from '../StyledToast/StyledToast'

const OtpState = {
  Initial: 0,
  Requested: 1,
  Sent: 2,
}

type FormValues = {
  email: string
  token: string
}

const AuthForm = (): JSX.Element => {
  const styles = useMultiStyleConfig('AuthForm', {})
  const toast = useStyledToast()
  const { register, handleSubmit, getValues, reset } = useForm<FormValues>()
  const [otpState, setOtpState] = useState(OtpState.Initial)
  const auth = useAuth()
  const otpGenerateMutation = useOtpGenerateMutation(
    () => {
      setOtpState(OtpState.Sent)
      toast({
        status: 'success',
        description: 'OTP sent',
      })
    },
    (error: unknown) => {
      toast({
        status: 'error',
        description: asErr(error).message,
      })
    },
  )
  const otpVerifyMutation = useOtpVerifyMutation(
    undefined,
    (error: unknown) => {
      // This was borrowed from AskGov1. It's a security measure that should probably return.
      // if (axios.isAxiosError(error)) {
      //   const data = (error as AxiosError<{ message: string }>).response
      //     ?.data || { message: undefined }
      //   if (
      //     data.message ===
      //     'You have hit the max number of attempts. Please request a new OTP.'
      //   ) {
      //     setOtpState(0)
      //   }
      // }
      toast({
        status: 'error',
        description: asErr(error).message,
      })
    },
  )

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (otpState === OtpState.Sent) {
      otpVerifyMutation.mutate(data)
      reset({ ...getValues(), token: '' })
    } else {
      setOtpState(OtpState.Requested)
      otpGenerateMutation.mutate({ email: data.email })
    }
  }

  let OtpComponent = null
  if (otpState === OtpState.Sent) {
    OtpComponent = (
      <>
        <FormLabel sx={styles.label} className="form-label">
          One-Time Password
        </FormLabel>
        <Input
          sx={styles.input}
          className="form-input"
          placeholder="Enter OTP sent to your email"
          {...register('token', { required: true, minLength: 6, maxLength: 6 })}
        />
      </>
    )
  } else if (otpState === OtpState.Requested) {
    OtpComponent = <Spinner centerHeight="50px" />
  }

  const contactComponent = (
    <>
      <FormLabel sx={styles.label} className="form-label">
        Email
      </FormLabel>
      <Input
        sx={styles.input}
        className="form-input"
        placeholder="e.g. jane@mail.com"
        {...register('email', { required: true })}
      />
    </>
  )

  return (
    <Flex sx={styles.container} className="form-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        {contactComponent}
        {OtpComponent}
        <Input
          sx={styles.submitButton}
          id="submit-button"
          name="submit-button"
          type="submit"
          value={otpState === OtpState.Sent ? 'Log In' : 'Send OTP'}
        />
      </form>
    </Flex>
  )
}

export default AuthForm
